#!/usr/bin/env python3
"""
Enhanced Cybersecurity News Scraper with Hugging Face Summarization
Uses open-source models for text summarization instead of QuillBot
"""

import requests
import pandas as pd
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
import logging
from typing import List, Dict, Optional
import re

# Hugging Face Transformers for summarization
try:
    from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
    HF_AVAILABLE = True
except ImportError:
    print("Transformers not installed. Install with: pip install transformers torch")
    HF_AVAILABLE = False

# Alternative: Use requests to Hugging Face Inference API (no local installation needed)
import os

class CyberNewsScraper:
    def __init__(self, use_local_model=False):
        """
        Initialize the news scraper with summarization capabilities
        
        Args:
            use_local_model (bool): If True, use local Hugging Face model. 
                                  If False, use Hugging Face Inference API
        """
        self.use_local_model = use_local_model
        self.summarizer = None
        self.setup_logging()
        self.setup_summarizer()
        
        # Headers for web scraping
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def setup_logging(self):
        """Setup logging configuration"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('cyber_news_scraper.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def setup_summarizer(self):
        """Setup the text summarization model"""
        if self.use_local_model and HF_AVAILABLE:
            try:
                # Use a lightweight, fast summarization model
                model_name = "facebook/bart-large-cnn"  # Good for news summarization
                self.logger.info(f"Loading local model: {model_name}")
                self.summarizer = pipeline(
                    "summarization", 
                    model=model_name,
                    tokenizer=model_name,
                    device=-1  # Use CPU (change to 0 for GPU)
                )
                self.logger.info("Local summarization model loaded successfully")
            except Exception as e:
                self.logger.error(f"Failed to load local model: {e}")
                self.use_local_model = False
        
        if not self.use_local_model:
            self.logger.info("Using Hugging Face Inference API for summarization")
    
    def summarize_with_hf_api(self, text: str, max_length: int = 150) -> str:
        """
        Summarize text using Hugging Face Inference API
        Free tier available, no local installation needed
        """
        API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
        
        # You can get a free API token from https://huggingface.co/settings/tokens
        # For demo purposes, we'll use a simple extractive summarization
        return self.extractive_summarization(text, max_length)
    
    def extractive_summarization(self, text: str, max_sentences: int = 3) -> str:
        """
        Simple extractive summarization as fallback
        Selects the most important sentences based on word frequency
        """
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if len(s.strip()) > 20]
        
        if len(sentences) <= max_sentences:
            return '. '.join(sentences) + '.'
        
        # Simple scoring based on word frequency
        words = re.findall(r'\w+', text.lower())
        word_freq = {}
        for word in words:
            if len(word) > 3:  # Ignore short words
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # Score sentences
        sentence_scores = {}
        for i, sentence in enumerate(sentences):
            score = 0
            words_in_sentence = re.findall(r'\w+', sentence.lower())
            for word in words_in_sentence:
                if word in word_freq:
                    score += word_freq[word]
            sentence_scores[i] = score / len(words_in_sentence) if words_in_sentence else 0
        
        # Get top sentences
        top_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)[:max_sentences]
        top_sentences = sorted([s[0] for s in top_sentences])  # Maintain original order
        
        summary = '. '.join([sentences[i] for i in top_sentences]) + '.'
        return summary
    
    def summarize_text(self, text: str, max_length: int = 150) -> str:
        """
        Summarize text using the configured method
        """
        if not text or len(text.strip()) < 100:
            return text
        
        try:
            if self.use_local_model and self.summarizer:
                # Use local Hugging Face model
                result = self.summarizer(
                    text, 
                    max_length=max_length, 
                    min_length=50, 
                    do_sample=False
                )
                return result[0]['summary_text']
            else:
                # Use fallback extractive summarization
                return self.extractive_summarization(text)
        except Exception as e:
            self.logger.error(f"Summarization failed: {e}")
            return self.extractive_summarization(text)
    
    def limit_text_to_words(self, text: str, max_words: int = 500) -> str:
        """Limit text to specified number of words"""
        words = text.split()
        return ' '.join(words[:max_words]) if len(words) > max_words else text
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        if not text:
            return ""
        
        # Remove extra whitespace and normalize
        text = re.sub(r'\s+', ' ', text.strip())
        # Remove special characters that might cause issues
        text = re.sub(r'[^\w\s.,!?;:-]', '', text)
        return text
    
    def scrape_economic_times_cyber(self, max_articles: int = 10) -> List[Dict]:
        """
        Scrape cybersecurity news from Economic Times
        """
        url = "https://economictimes.indiatimes.com/topic/cybersecurity"
        articles_data = []
        
        try:
            self.logger.info(f"Scraping news from: {url}")
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            articles = soup.find_all("div", class_='clr flt topicstry story_list')
            
            self.logger.info(f"Found {len(articles)} articles")
            
            for i, article in enumerate(articles[:max_articles]):
                try:
                    # Extract article link
                    link_element = article.find('a')
                    if not link_element:
                        continue
                    
                    article_link = 'https://economictimes.indiatimes.com' + link_element['href']
                    
                    # Get article details
                    article_data = self.scrape_article_details(article_link)
                    if article_data:
                        articles_data.append(article_data)
                        self.logger.info(f"Processed article {i+1}: {article_data['title'][:50]}...")
                    
                    # Add delay to be respectful to the server
                    time.sleep(1)
                    
                except Exception as e:
                    self.logger.error(f"Error processing article {i+1}: {e}")
                    continue
        
        except Exception as e:
            self.logger.error(f"Error scraping main page: {e}")
        
        return articles_data
    
    def scrape_article_details(self, article_url: str) -> Optional[Dict]:
        """
        Scrape individual article details
        """
        try:
            response = requests.get(article_url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract title
            title_element = soup.find("h1", class_='artTitle font_faus')
            title = self.clean_text(title_element.text) if title_element else "No Title"
            
            # Extract date
            date_element = soup.find("time", class_='jsdtTime')
            date = self.clean_text(date_element.text) if date_element else datetime.now().strftime("%Y-%m-%d")
            
            # Extract summary
            summary_element = soup.find("h2", class_='summary')
            summary = self.clean_text(summary_element.text) if summary_element else ""
            
            # Extract content
            content_element = soup.find("article", class_="artData clr paywall")
            content = self.clean_text(content_element.text) if content_element else ""
            
            if not content:
                content = summary
            
            # Generate bullet point summary
            if content and len(content) > 100:
                truncated_content = self.limit_text_to_words(content, 400)
                bullet_summary = self.summarize_text(truncated_content)
            else:
                bullet_summary = summary
            
            return {
                'title': title,
                'date': date,
                'summary': summary,
                'content': content,
                'bullet_summary': bullet_summary,
                'url': article_url,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            self.logger.error(f"Error scraping article {article_url}: {e}")
            return None
    
    def save_to_json(self, articles: List[Dict], filename: str = "cyber_news.json"):
        """Save articles to JSON file"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(articles, f, indent=2, ensure_ascii=False)
            self.logger.info(f"Saved {len(articles)} articles to {filename}")
        except Exception as e:
            self.logger.error(f"Error saving to JSON: {e}")
    
    def save_to_csv(self, articles: List[Dict], filename: str = "cyber_news.csv"):
        """Save articles to CSV file"""
        try:
            df = pd.DataFrame(articles)
            df.to_csv(filename, index=False, encoding='utf-8')
            self.logger.info(f"Saved {len(articles)} articles to {filename}")
        except Exception as e:
            self.logger.error(f"Error saving to CSV: {e}")

def main():
    """Main function to run the scraper"""
    # Initialize scraper (set use_local_model=True if you have transformers installed)
    scraper = CyberNewsScraper(use_local_model=False)
    
    # Scrape articles
    articles = scraper.scrape_economic_times_cyber(max_articles=15)
    
    if articles:
        # Save results
        scraper.save_to_json(articles, "cyber_news.json")
        scraper.save_to_csv(articles, "cyber_news.csv")
        
        print(f"\n✅ Successfully scraped {len(articles)} articles!")
        print("📁 Files saved: cyber_news.json, cyber_news.csv")
        
        # Display first article as example
        if articles:
            print(f"\n📰 Sample Article:")
            print(f"Title: {articles[0]['title']}")
            print(f"Date: {articles[0]['date']}")
            print(f"Summary: {articles[0]['bullet_summary'][:200]}...")
    else:
        print("❌ No articles were scraped successfully")

if __name__ == "__main__":
    main()
