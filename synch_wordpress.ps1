<#
    This script can be used to copy the wordpress directory in Windows to WSL and vice-versa.
    Edit the parameters (@line 72) and run the function that fits your need.
#>

#region functions
# Function to check if a directory exists in WSL
function Test-WslPath {
    param (
        [Parameter(Mandatory = $true)]        
        [string]$path
    )
    $exists = wsl bash -c "if [ -d $path ]; then echo 'true'; else echo 'false'; fi"
    return $exists -eq 'true'
}
# Function copy wsl to windows
function Copy-ToWindows {
    param (
        [Parameter(Mandatory = $true)]
        [string]$winPath,
        [Parameter(Mandatory = $true)]
        [string]$wslPath
    )
    $wslPathExists = Test-WslPath -path $wslPath

    if (-not $wslPathExists) {
        Write-Host "WordPress directory does not exist in WSL. Copying from Windows..."
        # Copy the WordPress project directory from Windows to WSL
        wsl cp -r $winPath $wslPath
    }
    else {
        Write-Host "Updating desiderius-hackathon/wordpress. Copying WSL dir to Windows..."
        # Remove the existing WordPress directory in WSL
        wsl bash -c "sudo rm -rf $winPath"
        # Copy the WordPress project directory from WSL to Windows
        wsl cp -r $wslPath $winPath
    }
    # Change permissions for the WordPress directory in WSL
    wsl bash -c "sudo chmod -R 777 $wslPath"

    Write-Host "Windows and WSL folder are synched!"
}
# Function copy windows to wsl
function Copy-ToWsl {
    param (
        [Parameter(Mandatory = $true)]
        [string]$winPath,
        [Parameter(Mandatory = $true)]
        [string]$wslPath
    )
    $wslPathExists = Test-WslPath -path $wslPath

    if (-not $wslPathExists) {
        Write-Host "WordPress directory does not exist in WSL. Copying from Windows..."
        # Copy the WordPress project directory from Windows to WSL
        wsl cp -r $winPath $wslPath
    }
    else {
        Write-Host "Updating desiderius-hackathon/wordpress. Copying WSL dir to Windows..."
        # Remove the existing WordPress directory in WSL
        wsl bash -c "sudo rm -rf $wslPath"
        # Copy the WordPress project directory from Windows to WSL
        wsl cp -r $winPath $wslPath
    }
    # Change permissions for the WordPress directory in WSL
    wsl bash -c "sudo chmod -R 777 $wslPath"

    Write-Host "Windows and WSL folder are synched!"
}
#endregion

#region parameters
$winPath = "/mnt/c/Users/adam/Documents/integration_project/desiderius-hackathon/wordpress"
$wslPath = "~/wordpress"
#endregion

#Copy-ToWindows -winPath $winPath -wslPath $wslPath
#Copy-ToWsl -winPath $winPath -wslPath $wslPath