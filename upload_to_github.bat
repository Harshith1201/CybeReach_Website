@echo off
echo ========================================
echo    CybeReach GitHub Upload Script
echo ========================================
echo.

echo 🚀 Initializing Git repository...
git init

echo 📁 Adding all files...
git add .

echo 💾 Creating initial commit...
git commit -m "Initial commit: CybeReach website with news integration and GitHub Pages support"

echo 🔗 Adding GitHub remote...
echo.
echo ⚠️  Enter your GitHub username (the one you forked the repository to):
set /p username="GitHub username: "
echo.
echo 🔗 Connecting to your fork: https://github.com/%username%/CybeReach.git
git remote add origin https://github.com/%username%/CybeReach.git

echo 📤 Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Upload complete!
echo.
echo 🌐 Your forked website will be available at:
echo    https://%username%.github.io/CybeReach/
echo.
echo 📋 Next steps to enable GitHub Pages:
echo    1. Go to your fork: https://github.com/%username%/CybeReach
echo    2. Click Settings > Pages
echo    3. Select "Deploy from a branch"
echo    4. Choose "main" branch and "/ (root)" folder
echo    5. Click Save
echo.
echo 🎉 Your forked website will be live in a few minutes!
echo.
echo 💡 Benefits of forking:
echo    ✅ You can contribute back to the original project
echo    ✅ You get your own copy to customize
echo    ✅ You can create pull requests for improvements
echo.
pause
