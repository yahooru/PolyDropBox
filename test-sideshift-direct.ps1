# Test SideShift API Directly
Write-Host "Testing SideShift API Directly" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Testing SideShift Quote Endpoint" -ForegroundColor Yellow
Write-Host "POST https://api.sideshift.ai/v2/quotes" -ForegroundColor White
Write-Host ""

$quoteData = @{
    depositMethodId = "btc"
    settleMethodId = "usdc-polygon"
    depositAmount = "0.001"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.sideshift.ai/v2/quotes" -Method POST -Body $quoteData -ContentType "application/json"
    Write-Host "SideShift Quote API is working!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "SideShift Quote API failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "2. Testing SideShift via Our API" -ForegroundColor Yellow
Write-Host "Note: This requires a valid file ID and running server" -ForegroundColor White
Write-Host ""

$fileId = Read-Host "Enter a file ID (or press Enter to skip)"

if ($fileId) {
    $orderData = @{
        fileId = $fileId
        inputAsset = "BTC"
        outputAsset = "USDC"
        outputNetwork = "POLYGON"
        outputAddress = "0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938"
        amount = "10"
        payer = "0x1234567890123456789012345678901234567890"
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/sideshift/create" -Method POST -Body $orderData -ContentType "application/json"
        Write-Host "SideShift Order Created!" -ForegroundColor Green
        Write-Host "Response:" -ForegroundColor Cyan
        $response | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "SideShift Order Creation Failed" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "Skipped (no file ID provided)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "SideShift API Test Complete!" -ForegroundColor Green
