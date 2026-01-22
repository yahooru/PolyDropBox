const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 Deploying contracts to Polygon Amoy...\n");

  // Check environment variables
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY not found in .env file");
  }

  // Deploy MockUSDC first
  console.log("📝 Deploying MockUSDC...");
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment();
  const usdcAddress = await mockUSDC.getAddress();
  console.log("✅ MockUSDC deployed to:", usdcAddress);

  // Get platform fee recipient
  const [deployer] = await hre.ethers.getSigners();
  const platformFeeRecipient = process.env.PLATFORM_FEE_RECIPIENT || deployer.address;
  
  console.log("\n📝 Deploying PolyDropBox...");
  const PolyDropBox = await hre.ethers.getContractFactory("PolyDropBox");
  const polyDropBox = await PolyDropBox.deploy(usdcAddress, platformFeeRecipient);
  await polyDropBox.waitForDeployment();
  const contractAddress = await polyDropBox.getAddress();
  
  console.log("✅ PolyDropBox deployed to:", contractAddress);
  console.log("✅ Platform fee recipient:", platformFeeRecipient);
  console.log("✅ Deployer address:", deployer.address);
  
  console.log("\n" + "=".repeat(60));
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("Network: Polygon Amoy Testnet");
  console.log("MockUSDC:", usdcAddress);
  console.log("PolyDropBox:", contractAddress);
  console.log("Platform Fee Recipient:", platformFeeRecipient);
  console.log("=".repeat(60));
  
  console.log("\n💾 Add these to your .env file:");
  console.log(`NEXT_PUBLIC_USDC_ADDRESS=${usdcAddress}`);
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`PLATFORM_FEE_RECIPIENT=${platformFeeRecipient}`);
  console.log("\n✅ Deployment complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
