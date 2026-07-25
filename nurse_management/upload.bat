@echo off
title Uploading files to GitHub...

echo ===================================================
echo   Uploading changes to GitHub and updating Vercel  
echo ===================================================
echo.

cd /d "d:\antigravity"

echo [1/3] Checking local changes...
git status --short
echo.

echo [2/3] Committing changes...
git add -A
set timestamp=%date% %time%
git commit -m "Manual upload: %timestamp%"
echo.

echo [3/3] Pushing to GitHub...
git push origin main
echo.

echo ===================================================
echo   Upload completed successfully! Site will update soon.
echo ===================================================
echo.
pause
