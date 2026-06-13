@echo off
echo =========================================
echo  Auto-Backup and Push to GitHub
echo =========================================
cd /d "%~dp0"
git add .
git commit -m "Auto update from Local"
git push -u origin HEAD:main
echo.
echo =========================================
echo  Upload Complete! You can close this window.
echo =========================================
pause
