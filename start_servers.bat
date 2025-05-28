@echo off
echo 🚀 Starting CybeReach Website with Network Access
echo ================================================

echo.
echo 📡 Starting Backend API Server...
start "CybeReach API" cmd /k "cd backend && python setup.py"

echo.
echo ⏳ Waiting for API server to start...
timeout /t 10 /nobreak > nul

echo.
echo 🌐 Starting Frontend Web Server...
start "CybeReach Website" cmd /k "python -m http.server 8000"

echo.
echo ✅ Both servers are starting!
echo.
echo 🔗 Access Links:
echo ================
echo 📱 Local Access: http://localhost:8000
echo 🌍 Network Access: http://192.168.1.7:8000
echo 🔧 API Server: http://192.168.1.7:5000
echo.
echo 📋 Share this link with others on your network:
echo    http://192.168.1.7:8000
echo.
echo ⚠️  Note: Make sure Windows Firewall allows these connections
echo    or temporarily disable firewall for testing.
echo.
echo 🛑 Press any key to close this window (servers will keep running)
pause > nul
