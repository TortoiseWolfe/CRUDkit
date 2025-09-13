param(
    [string]$InputFilePath,
    [string]$FeatureName,
    [string]$BranchName
)

# Validate parameters
if (-not $InputFilePath) {
    Write-Error "InputFilePath is required"
    exit 1
}

if (-not $FeatureName) {
    Write-Error "FeatureName is required"
    exit 1
}

# Create feature directory
$featureDir = ".specify/features/$FeatureName"
New-Item -ItemType Directory -Force -Path $featureDir | Out-Null

# Copy input file to feature directory
Copy-Item $InputFilePath "$featureDir/input.md"

# Generate specification from input
Write-Host "Generating specification for $FeatureName..."
$specContent = @"
# $FeatureName Specification

Generated from: $InputFilePath

## Overview
This specification outlines the implementation plan for $FeatureName.

## Input Document
$(Get-Content $InputFilePath -Raw)

## Generated Specification
Based on the input document, the following specification has been generated:

### Goals
- Implement features defined in the constitution
- Address technical requirements
- Follow established patterns

### Deliverables
- Implementation code
- Tests
- Documentation

### Timeline
- Sprint duration: 2 weeks
- Daily progress tracking
- Sprint review and retrospective
"@

# Write specification to file
Set-Content -Path "$featureDir/spec.md" -Value $specContent

# Create or switch to branch if specified
if ($BranchName) {
    git checkout -b $BranchName 2>$null || git checkout $BranchName
}

# Output results
Write-Host "Feature created successfully!"
Write-Host "Location: $featureDir"
Write-Host "Specification: $featureDir/spec.md"
if ($BranchName) {
    Write-Host "Branch: $BranchName"
}