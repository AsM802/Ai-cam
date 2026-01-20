@echo off
echo ========================================
echo   TRAFFIC VIOLATION APP - CONNECTION
echo ========================================
echo.
echo The Expo development server is running in tunnel mode.
echo.
echo TO CONNECT YOUR PHONE:
echo.
echo 1. Install "Expo Go" app on your phone
echo    - Android: Play Store
echo    - iOS: App Store
echo.
echo 2. Open Expo Go app
echo.
echo 3. Tap "Enter URL manually"
echo.
echo 4. Enter one of these URLs:
echo.
echo    Option 1 (Local): exp://127.0.0.1:8081
echo    Option 2 (Tunnel): Check the PowerShell window running
echo                       "npx expo start --tunnel"
echo                       Look for a URL with "ngrok" in it
echo.
echo 5. Tap "Connect"
echo.
echo ========================================
echo.
echo Press any key to open Expo Go download pages...
pause >nul

start https://expo.dev/go
