# start-autopush.ps1
# Script to launch the Git Auto-Push watcher in the background.

$WatcherPath = "d:/antigravity"
$ScriptFile = "$WatcherPath/git-autopush.ps1"
$PidFile = "$WatcherPath/autopush.pid"

# Check if watcher is already running
if (Test-Path $PidFile) {
    $OldPid = Get-Content $PidFile -Raw
    if (Get-Process -Id $OldPid -ErrorAction SilentlyContinue) {
        Write-Host "Git Auto-Push Watcher is already running in background (PID: $OldPid)" -ForegroundColor Yellow
        exit
    } else {
        Remove-Item $PidFile -Force
    }
}

# Launch the process detached using WMI (win32_process)
$Command = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$ScriptFile`""
$WmiClass = [wmiclass]"win32_process"
$Result = $WmiClass.Create($Command)

if ($Result.ReturnValue -eq 0) {
    $NewPid = $Result.ProcessId
    $NewPid | Out-File -FilePath $PidFile -Force
    Write-Host "Git Auto-Push Watcher successfully started in the background (PID: $NewPid)" -ForegroundColor Green
    Write-Host "Saving any code file will now automatically update GitHub and Vercel!" -ForegroundColor Green
} else {
    Write-Host "Failed to start background process. WMI ReturnValue: $($Result.ReturnValue)" -ForegroundColor Red
}
