# Edit parameter accordingly
$winPath = "/mnt/c/Users/adam/Documents/integration_project/desiderius-hackathon/wordpress"
$wslWpPath = "~/wordpress"

# Function to check if a directory exists in WSL
function Test-WslPath {
    param (
        [string]$path
    )
    $exists = wsl bash -c "if [ -d $path ]; then echo 'true'; else echo 'false'; fi"
    return $exists -eq 'true'
}

# Check if the WordPress directory exists in WSL
$wslWpPathExists = Test-WslPath -path $wslWpPath

if (-not $wslWpPathExists) {
    Write-Host "WordPress directory does not exist in WSL. Copying from Windows..."
    # Copy the WordPress project directory from Windows to WSL
    wsl cp -r $winPath $wslWpPath
} else {
    Write-Host "Updating desiderius-hackathon/wordpress. Copying WSL dir..."
        # Remove the existing WordPress directory in WSL
        wsl bash -c "sudo rm -rf $wslWpPath"
        # Copy the WordPress project directory from Windows to WSL
        wsl cp -r $winPath $wslWpPath
}

# Change permissions for the WordPress directory in WSL
wsl bash -c "chmod -R 777 $wslWpPath"

Write-Host "Synchronization complete."