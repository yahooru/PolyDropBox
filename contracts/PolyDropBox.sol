// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";




/**
 * @title PolyDropBox
 * @dev Decentralized file sharing with USDC payments on Polygon
 */
contract PolyDropBox is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct FileRecord {
        string ipfsHash;
        address creator;
        uint256 price;
        uint256 expiryTime;
        uint256 maxDownloads;
        uint256 downloadCount;
        bool burnAfterDownload;
        bool isActive;
        uint256 createdAt;
    }

    mapping(string => FileRecord) public files;
    mapping(string => mapping(address => bool)) public accessGranted;

    IERC20 public immutable usdc;
    address public platformFeeRecipient;
    uint256 public platformFeeBps = 250; // 2.5%

    event FileCreated(
        string indexed fileId,
        string ipfsHash,
        address creator,
        uint256 price,
        uint256 expiryTime,
        uint256 maxDownloads,
        bool burnAfterDownload
    );

    event AccessGranted(string indexed fileId, address payer, uint256 amount);
    event CrossChainPaymentRecorded(string indexed fileId, address payer, uint256 amount);
    event DownloadRecorded(string indexed fileId, address user);
    event FileDeactivated(string indexed fileId);

    constructor(address _usdc, address _platformFeeRecipient) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC");
        require(_platformFeeRecipient != address(0), "Invalid fee recipient");
        usdc = IERC20(_usdc);
        platformFeeRecipient = _platformFeeRecipient;
    }

    function createFile(
        string calldata fileId,
        string calldata ipfsHash,
        uint256 price,
        uint256 expiryTime,
        uint256 maxDownloads,
        bool burnAfterDownload
    ) external {
        require(bytes(files[fileId].ipfsHash).length == 0, "File already exists");
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");

        files[fileId] = FileRecord({
            ipfsHash: ipfsHash,
            creator: msg.sender,
            price: price,
            expiryTime: expiryTime,
            maxDownloads: maxDownloads,
            downloadCount: 0,
            burnAfterDownload: burnAfterDownload,
            isActive: true,
            createdAt: block.timestamp
        });

        emit FileCreated(fileId, ipfsHash, msg.sender, price, expiryTime, maxDownloads, burnAfterDownload);
    }

    function payForAccess(string calldata fileId) external nonReentrant {
        FileRecord storage file = files[fileId];
        require(bytes(file.ipfsHash).length > 0, "File not found");
        require(file.isActive, "File inactive");
        require(block.timestamp <= file.expiryTime, "File expired");
        require(!accessGranted[fileId][msg.sender], "Already has access");
        require(file.price > 0, "Free file");

        uint256 platformFee = (file.price * platformFeeBps) / 10000;
        uint256 creatorAmount = file.price - platformFee;

        usdc.safeTransferFrom(msg.sender, file.creator, creatorAmount);
        if (platformFee > 0) {
            usdc.safeTransferFrom(msg.sender, platformFeeRecipient, platformFee);
        }

        accessGranted[fileId][msg.sender] = true;
        emit AccessGranted(fileId, msg.sender, file.price);
    }

    function recordCrossChainPayment(
        string calldata fileId,
        address payer,
        uint256 amount
    ) external onlyOwner nonReentrant {
        FileRecord storage file = files[fileId];
        require(bytes(file.ipfsHash).length > 0, "File not found");
        require(file.isActive, "File inactive");
        require(block.timestamp <= file.expiryTime, "File expired");
        require(!accessGranted[fileId][payer], "Already has access");
        require(amount >= file.price, "Insufficient amount");

        uint256 platformFee = (file.price * platformFeeBps) / 10000;
        uint256 creatorAmount = file.price - platformFee;

        usdc.safeTransfer(file.creator, creatorAmount);
        if (platformFee > 0) {
            usdc.safeTransfer(platformFeeRecipient, platformFee);
        }

        accessGranted[fileId][payer] = true;
        emit CrossChainPaymentRecorded(fileId, payer, amount);
    }

    function hasAccess(string calldata fileId, address user) external view returns (bool) {
        FileRecord storage file = files[fileId];
        if (bytes(file.ipfsHash).length == 0) return false;
        if (!file.isActive) return false;
        if (block.timestamp > file.expiryTime) return false;
        if (file.price == 0) return true;
        return accessGranted[fileId][user];
    }

    function recordDownload(string calldata fileId, address user) external nonReentrant {
        FileRecord storage file = files[fileId];
        require(bytes(file.ipfsHash).length > 0, "File not found");
        require(accessGranted[fileId][user], "No access");

        file.downloadCount++;
        if (file.burnAfterDownload) {
            file.isActive = false;
            emit FileDeactivated(fileId);
        }
        emit DownloadRecorded(fileId, user);
    }

    function getFile(string calldata fileId)
        external
        view
        returns (
            string memory ipfsHash,
            address creator,
            uint256 price,
            uint256 expiryTime,
            uint256 maxDownloads,
            uint256 downloadCount,
            bool burnAfterDownload,
            bool isActive,
            uint256 createdAt
        )
    {
        FileRecord storage file = files[fileId];
        return (
            file.ipfsHash,
            file.creator,
            file.price,
            file.expiryTime,
            file.maxDownloads,
            file.downloadCount,
            file.burnAfterDownload,
            file.isActive,
            file.createdAt
        );
    }

    function setPlatformFeeRecipient(address _recipient) external onlyOwner {
        require(_recipient != address(0), "Invalid address");
        platformFeeRecipient = _recipient;
    }

    function setPlatformFeeBps(uint256 _bps) external onlyOwner {
        require(_bps <= 1000, "Max 10%");
        platformFeeBps = _bps;
    }
}
