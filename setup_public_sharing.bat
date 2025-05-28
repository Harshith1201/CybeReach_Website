@echo off
echo 🌍 CybeReach Website - Public Sharing Setup
echo ==========================================
echo.

echo 📋 STEP 1: Get Your Ngrok Auth Token
echo ------------------------------------
echo 1. Go to: https://dashboard.ngrok.com/signup
echo 2. Sign up for a FREE account
echo 3. Go to: https://dashboard.ngrok.com/get-started/your-authtoken
echo 4. Copy your authtoken
echo.

set /p authtoken="Enter your ngrok authtoken: "

if "%authtoken%"=="" (
    echo ❌ No authtoken provided. Please run this script again.
    pause
    exit /b 1
)

echo.
echo 🔧 STEP 2: Configuring Ngrok...
echo --------------------------------
cd backend
ngrok.exe config add-authtoken %authtoken%

if %errorlevel% neq 0 (
    echo ❌ Failed to configure ngrok. Please check your authtoken.
    pause
    exit /b 1
)

echo ✅ Ngrok configured successfully!
echo.

echo 🚀 STEP 3: Starting Services...
echo --------------------------------
echo Starting backend API server...
start "CybeReach API" cmd /k "python news_api.py"

echo Waiting for API to start...
timeout /t 5 /nobreak > nul

echo Starting backend ngrok tunnel...
start "Backend Tunnel" cmd /k "ngrok.exe http 5000"

echo Waiting for backend tunnel...
timeout /t 3 /nobreak > nul

cd ..
echo Starting frontend server...
start "CybeReach Website" cmd /k "python -m http.server 8000"

echo Waiting for frontend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend ngrok tunnel...
start "Frontend Tunnel" cmd /k "backend\ngrok.exe http 8000"

echo.
echo 🎉 SETUP COMPLETE!
echo ==================
echo.
echo 📋 Next Steps:
echo --------------
echo 1. Check the ngrok windows for your public URLs
echo 2. Copy the BACKEND ngrok URL (port 5000)
echo 3. Update the API URL in index.html
echo 4. Share the FRONTEND ngrok URL (port 8000) with others
echo.
echo 🔗 Your services are running on:
echo   - Local Frontend: http://localhost:8000
echo   - Local Backend:  http://localhost:5000
echo.
echo 💡 To update API URL for public access:
echo   Edit index.html and replace the CYBER_NEWS_API_URL
echo   with your backend ngrok URL
echo.
pause
