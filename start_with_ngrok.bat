@echo off
echo 🌍 CybeReach Website - Worldwide Sharing Setup
echo ===============================================

echo.
echo 📋 Prerequisites Check:
echo ----------------------
echo ✅ Make sure ngrok is installed and authenticated
echo ✅ Get ngrok from: https://ngrok.com/
echo ✅ Run: ngrok authtoken YOUR_TOKEN
echo.

echo 🚀 Starting CybeReach Website...
echo.

echo 📡 Starting Backend API Server...
start "CybeReach API" cmd /k "cd backend && python setup.py"

echo ⏳ Waiting for API server to start...
timeout /t 10 /nobreak > nul

echo 🌐 Starting Frontend Web Server...
start "CybeReach Website" cmd /k "python -m http.server 8000"

echo ⏳ Waiting for frontend server to start...
timeout /t 5 /nobreak > nul

echo.
echo 🌍 Ready to create worldwide tunnel!
echo.
echo 📋 Next Steps:
echo ==============
echo 1. Open a new Command Prompt
echo 2. Navigate to your ngrok folder
echo 3. Run: ngrok http 8000
echo 4. Copy the https:// URL from ngrok
echo 5. Share that URL with anyone worldwide!
echo.
echo 🔗 Local Access (for you):
echo   http://localhost:8000
echo.
echo 🌍 Worldwide Access (after ngrok):
echo   https://YOUR-NGROK-URL.ngrok.io
echo.
echo 💡 Pro Tip: For custom subdomain use:
echo   ngrok http 8000 --subdomain=cybereach
echo.
echo 🛑 Keep this window open while sharing!
echo.
pause
