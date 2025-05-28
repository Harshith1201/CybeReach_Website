#!/usr/bin/env python3
"""
Simple Flask API to serve cybersecurity news data
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime
import threading
import time
from cyber_news_scraper import CyberNewsScraper

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Global variables
news_data = []
last_update = None
scraper = None

def load_news_data():
    """Load news data from JSON file"""
    global news_data, last_update
    try:
        if os.path.exists('cyber_news.json'):
            with open('cyber_news.json', 'r', encoding='utf-8') as f:
                news_data = json.load(f)
            last_update = datetime.now()
            print(f"✅ Loaded {len(news_data)} articles from cache")
        else:
            print("📰 No cached news found, will fetch fresh data")
            fetch_fresh_news()
    except Exception as e:
        print(f"❌ Error loading news data: {e}")
        news_data = []

def fetch_fresh_news():
    """Fetch fresh news data using the scraper"""
    global news_data, last_update, scraper
    try:
        print("🔄 Fetching fresh cybersecurity news...")
        if not scraper:
            scraper = CyberNewsScraper(use_local_model=False)
        
        articles = scraper.scrape_economic_times_cyber(max_articles=12)
        if articles:
            news_data = articles
            last_update = datetime.now()
            
            # Save to file for caching
            scraper.save_to_json(articles, 'cyber_news.json')
            print(f"✅ Fetched {len(articles)} fresh articles")
        else:
            print("⚠️ No articles fetched")
    except Exception as e:
        print(f"❌ Error fetching fresh news: {e}")

def background_news_update():
    """Background task to update news periodically"""
    while True:
        try:
            # Update every 2 hours
            time.sleep(2 * 60 * 60)
            fetch_fresh_news()
        except Exception as e:
            print(f"❌ Background update error: {e}")
            time.sleep(60)  # Wait 1 minute before retrying

@app.route('/api/news', methods=['GET'])
def get_news():
    """Get all cybersecurity news articles"""
    try:
        limit = request.args.get('limit', default=10, type=int)
        limited_news = news_data[:limit] if news_data else []
        
        return jsonify({
            'success': True,
            'articles': limited_news,
            'total': len(news_data),
            'last_update': last_update.isoformat() if last_update else None
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'articles': []
        }), 500

@app.route('/api/news/latest', methods=['GET'])
def get_latest_news():
    """Get the latest news article"""
    try:
        if news_data:
            return jsonify({
                'success': True,
                'article': news_data[0],
                'last_update': last_update.isoformat() if last_update else None
            })
        else:
            return jsonify({
                'success': False,
                'message': 'No news available',
                'article': None
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'article': None
        }), 500

@app.route('/api/news/refresh', methods=['POST'])
def refresh_news():
    """Manually refresh news data"""
    try:
        # Run in background to avoid timeout
        thread = threading.Thread(target=fetch_fresh_news)
        thread.daemon = True
        thread.start()
        
        return jsonify({
            'success': True,
            'message': 'News refresh started in background'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/news/search', methods=['GET'])
def search_news():
    """Search news articles by keyword"""
    try:
        query = request.args.get('q', '').lower()
        if not query:
            return jsonify({
                'success': False,
                'message': 'Search query required',
                'articles': []
            }), 400
        
        filtered_articles = []
        for article in news_data:
            if (query in article.get('title', '').lower() or 
                query in article.get('summary', '').lower() or 
                query in article.get('bullet_summary', '').lower()):
                filtered_articles.append(article)
        
        return jsonify({
            'success': True,
            'articles': filtered_articles,
            'total': len(filtered_articles),
            'query': query
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'articles': []
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'articles_count': len(news_data),
        'last_update': last_update.isoformat() if last_update else None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/', methods=['GET'])
def index():
    """API documentation"""
    return jsonify({
        'message': 'CybeReach News API',
        'version': '1.0.0',
        'endpoints': {
            '/api/news': 'GET - Get all news articles (with optional limit parameter)',
            '/api/news/latest': 'GET - Get the latest news article',
            '/api/news/refresh': 'POST - Manually refresh news data',
            '/api/news/search': 'GET - Search articles (requires q parameter)',
            '/api/health': 'GET - Health check'
        },
        'example_usage': {
            'get_news': '/api/news?limit=5',
            'search': '/api/news/search?q=ransomware'
        }
    })

def initialize_app():
    """Initialize the application"""
    print("🚀 Starting CybeReach News API...")
    
    # Load initial data
    load_news_data()
    
    # Start background update thread
    update_thread = threading.Thread(target=background_news_update)
    update_thread.daemon = True
    update_thread.start()
    
    print("✅ API initialized successfully")

if __name__ == '__main__':
    initialize_app()
    
    # Run the Flask app
    print("🌐 Starting Flask server on http://localhost:5000")
    print("📖 API documentation available at http://localhost:5000")
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=False,  # Set to True for development
        threaded=True
    )
