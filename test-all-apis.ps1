# Complete API Testing Script
Write-Host "Testing All PolyDropBox APIs" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

$BASE_URL = "http://localhost:3000"
$global:PASSED = 0
$global:FAILED = 0

function Test-API {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Endpoint,
        [string]$Data = $null,
        [int]$ExpectedStatus = 200
    )
    
    Write-Host -NoNewline "Testing $Name... "
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-WebRequest -Uri "$BASE_URL$Endpoint" -Method GET -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
            $statusCode = $response.StatusCode
        } else {
            $response = Invoke-WebRequest -Uri "$BASE_URL$Endpoint" -Method POST -Body $Data -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
            $statusCode = $response.StatusCode
        }
        
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "PASS" -ForegroundColor Green -NoNewline
            Write-Host " (Status: $statusCode)"
            $global:PASSED++
        } else {
            Write-Host "FAIL" -ForegroundColor Red -NoNewline
            Write-Host " (Expected: $ExpectedStatus, Got: $statusCode)"
            $global:FAILED++
        }
    } catch {
        $statusCode = 0
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode.value__
        }
        
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "PASS" -ForegroundColor Green -NoNewline
            Write-Host " (Status: $statusCode)"
            $global:PASSED++
        } else {
            Write-Host "FAIL" -ForegroundColor Red -NoNewline
            Write-Host " (Expected: $ExpectedStatus, Got: $statusCode)"
            $global:FAILED++
        }
    }
}

Write-Host "1. Health Check API" -ForegroundColor Yellow
Test-API -Name "Health Check" -Method "GET" -Endpoint "/api/health" -ExpectedStatus 200
Write-Host ""

Write-Host "2. File APIs" -ForegroundColor Yellow
Test-API -Name "Get Files (no creator)" -Method "GET" -Endpoint "/api/files" -ExpectedStatus 400
Test-API -Name "Get File (not found)" -Method "GET" -Endpoint "/api/file/test123" -ExpectedStatus 404
Write-Host ""

Write-Host "3. SideShift APIs" -ForegroundColor Yellow
$sideshiftData = '{"fileId":"test123","inputAsset":"BTC","outputAsset":"USDC","outputNetwork":"POLYGON","outputAddress":"0x1234567890123456789012345678901234567890","amount":"10","payer":"0x1234567890123456789012345678901234567890"}'
Test-API -Name "Create SideShift Order" -Method "POST" -Endpoint "/api/sideshift/create" -Data $sideshiftData -ExpectedStatus 404
Test-API -Name "Check SideShift Status" -Method "GET" -Endpoint "/api/sideshift/status/test-order" -ExpectedStatus 404
Write-Host ""

Write-Host "4. Download API" -ForegroundColor Yellow
$downloadData = '{"fileId":"test123","user":"0x1234567890123456789012345678901234567890"}'
Test-API -Name "Download" -Method "POST" -Endpoint "/api/download" -Data $downloadData -ExpectedStatus 404
Write-Host ""

Write-Host "============================" -ForegroundColor Cyan
Write-Host "Test Results:" -ForegroundColor Cyan
Write-Host "Passed: $global:PASSED" -ForegroundColor Green
Write-Host "Failed: $global:FAILED" -ForegroundColor $(if ($global:FAILED -eq 0) { "Green" } else { "Yellow" })
Write-Host "============================" -ForegroundColor Cyan

if ($global:FAILED -eq 0) {
    Write-Host "All API endpoints are working correctly!" -ForegroundColor Green
} else {
    Write-Host "Some tests failed. Start the server first: cd frontend; npm run dev" -ForegroundColor Yellow
}

