const hre = require("hardhat");
require("dotenv").config();

// Polygon Mainnet USDC (Native - Circle)
const POLYGON_USDC = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

async function main() {
  console.log("🚀 Deploying PolyDropBox to Polygon Mainnet...\n");

  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY not found in .env file");
  }

  const [deployer] = await hre.ethers.getSigners();
  const platformFeeRecipient = process.env.PLATFORM_FEE_RECIPIENT || deployer.address;

  console.log("Deployer:", deployer.address);
  console.log("Platform fee recipient:", platformFeeRecipient);
  console.log("USDC address:", POLYGON_USDC);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("MATIC balance:", hre.ethers.formatEther(balance), "MATIC\n");

  console.log("📝 Deploying PolyDropBox...");
  const PolyDropBox = await hre.ethers.getContractFactory("PolyDropBox");
  const polyDropBox = await PolyDropBox.deploy(POLYGON_USDC, platformFeeRecipient);
  await polyDropBox.waitForDeployment();
  const contractAddress = await polyDropBox.getAddress();

  console.log("✅ PolyDropBox deployed to:", contractAddress);

  console.log("\n" + "=".repeat(60));
  console.log("📋 POLYGON MAINNET DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("Network: Polygon Mainnet (Chain ID 137)");
  console.log("PolyDropBox:", contractAddress);
  console.log("USDC (Native):", POLYGON_USDC);
  console.log("Platform Fee Recipient:", platformFeeRecipient);
  console.log("=".repeat(60));

  console.log("\n💾 Add these to your .env / frontend/.env.local:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`NEXT_PUBLIC_USDC_ADDRESS=${POLYGON_USDC}`);
  console.log(`NEXT_PUBLIC_POLYGON_RPC=${process.env.POLYGON_MAINNET_RPC || process.env.POLYGON_AMOY_RPC || "https://polygon-rpc.com"}`);
  console.log("\n✅ Mainnet deployment complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
