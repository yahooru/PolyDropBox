# Test Polygon Blockchain Directly
Write-Host "Testing Polygon Blockchain Integration" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$CONTRACT_ADDRESS = "0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938"
$USDC_ADDRESS = "0xC2266E725B5f2d657ba76D992630968272bb5ebc"
$RPC_URL = "https://rpc-amoy.polygon.technology"

Write-Host "1. Testing Polygon RPC Connection" -ForegroundColor Yellow
Write-Host "Testing: $RPC_URL" -ForegroundColor White
Write-Host ""

$rpcData = @{
    jsonrpc = "2.0"
    method = "eth_blockNumber"
    params = @()
    id = 1
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $RPC_URL -Method POST -Body $rpcData -ContentType "application/json"
    if ($response.result) {
        Write-Host "Polygon RPC is working!" -ForegroundColor Green
        $blockNumber = [Convert]::ToInt64($response.result, 16)
        Write-Host "Current block: $blockNumber" -ForegroundColor Cyan
    } else {
        Write-Host "Polygon RPC connection failed" -ForegroundColor Red
    }
} catch {
    Write-Host "Polygon RPC connection failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. Contract Addresses" -ForegroundColor Yellow
Write-Host "PolyDropBox: $CONTRACT_ADDRESS" -ForegroundColor White
Write-Host "MockUSDC: $USDC_ADDRESS" -ForegroundColor White
Write-Host ""
Write-Host "View on PolygonScan:" -ForegroundColor Cyan
Write-Host "PolyDropBox: https://amoy.polygonscan.com/address/$CONTRACT_ADDRESS" -ForegroundColor White
Write-Host "MockUSDC: https://amoy.polygonscan.com/address/$USDC_ADDRESS" -ForegroundColor White
Write-Host ""

Write-Host "Polygon Integration Test Complete!" -ForegroundColor Green
