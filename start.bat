@echo off
title AVATAR

rem Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js to run this script.
    pause
    exit /b
)

rem Run the Node.js script
node index.js

pause