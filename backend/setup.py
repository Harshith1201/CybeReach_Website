#!/usr/bin/env python3
"""
Setup script for CybeReach News Backend
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("📦 Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False

def test_scraper():
    """Test the news scraper"""
    print("🧪 Testing news scraper...")
    try:
        from cyber_news_scraper import CyberNewsScraper
        scraper = CyberNewsScraper(use_local_model=False)
        
        # Test with a small number of articles
        articles = scraper.scrape_economic_times_cyber(max_articles=2)
        
        if articles:
            print(f"✅ Scraper test successful! Found {len(articles)} articles")
            print(f"📰 Sample: {articles[0]['title'][:50]}...")
            return True
        else:
            print("⚠️ Scraper test returned no articles")
            return False
            
    except Exception as e:
        print(f"❌ Scraper test failed: {e}")
        return False

def start_api():
    """Start the Flask API"""
    print("🚀 Starting Flask API...")
    try:
        from news_api import app, initialize_app
        initialize_app()
        
        print("✅ API initialized successfully!")
        print("🌐 Starting server on http://localhost:5000")
        print("📖 API documentation: http://localhost:5000")
        print("📰 Test endpoint: http://localhost:5000/api/news")
        print("\n🛑 Press Ctrl+C to stop the server")
        
        app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
        
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting API: {e}")

def main():
    """Main setup function"""
    print("🔧 CybeReach News Backend Setup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found. Please run this script from the backend directory.")
        return
    
    # Install requirements
    if not install_requirements():
        print("❌ Setup failed during package installation")
        return
    
    print("\n" + "=" * 40)
    
    # Test scraper
    if not test_scraper():
        print("⚠️ Scraper test failed, but continuing with API setup...")
    
    print("\n" + "=" * 40)
    
    # Ask user if they want to start the API
    response = input("\n🚀 Would you like to start the API server now? (y/n): ").lower().strip()
    
    if response in ['y', 'yes']:
        start_api()
    else:
        print("\n✅ Setup complete!")
        print("📝 To start the API later, run: python news_api.py")
        print("📝 To test the scraper, run: python cyber_news_scraper.py")

if __name__ == "__main__":
    main()
