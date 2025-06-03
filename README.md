# 🛡️ CybeReach - Cybersecurity Research Hub

[![GitHub stars](https://img.shields.io/github/stars/CybeReach/CybeReach?style=social)](https://github.com/CybeReach/CybeReach)
[![GitHub forks](https://img.shields.io/github/forks/CybeReach/CybeReach?style=social)](https://github.com/CybeReach/CybeReach)
[![GitHub issues](https://img.shields.io/github/issues/CybeReach/CybeReach)](https://github.com/CybeReach/CybeReach/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern cybersecurity website featuring an enhanced UI, comprehensive cyber calendar, and integrated news scraping with newspaper-style design. Built for the cybersecurity community to stay informed and connected.

## 🌟 Live Demo

🔗 **[Visit CybeReach Website]((https://harshith1201.github.io/CybeReach_Website/)** 

## 📸 Screenshots

![CybeReach Homepage](images/preview-homepage.png)
*Modern cybersecurity hub with integrated news and calendar*

## 🚀 Features

### ✨ Enhanced UI
- Modern, responsive design with improved typography
- Smooth animations and transitions
- Better color schemes and visual hierarchy
- Mobile-optimized layouts

### 📰 News Integration
- **Newspaper cutout design** for cybersecurity news
- **Open-source text summarization** using Hugging Face transformers
- **Real-time news scraping** from Economic Times cybersecurity section
- **Automatic summarization** with bullet points
- **Responsive newspaper layout** with main story and sidebar articles

### 📅 Cyber Calendar
- **20+ real cybersecurity events** including:
  - Historical milestones (Morris Worm, first computer virus, etc.)
  - Important people birthdays (Kevin Mitnick, John McAfee, etc.)
  - Major conferences (RSA, Black Hat, DEF CON, etc.)
  - Awareness events (Cybersecurity Awareness Month, Data Privacy Day, etc.)
- **Interactive calendar** with detailed descriptions
- **Color-coded categories** for easy identification

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3** with modern styling
- **JavaScript ES6+** for dynamic functionality
- **Responsive design** for all devices
- **CSS Grid & Flexbox** for layouts

### Backend
- **Python 3.7+** for news scraping
- **Flask** for API server
- **BeautifulSoup4** for web scraping
- **Hugging Face Transformers** for text summarization (optional)
- **Pandas** for data processing

### News Scraping
- **No browser automation** (removed Selenium dependency)
- **Lightweight extractive summarization** as fallback
- **Optional Hugging Face models** for advanced summarization
- **Respectful scraping** with delays and error handling

## 📱 Usage

### Viewing News
1. Open the website in your browser
2. The news section will automatically load with the latest cybersecurity news
3. Click "Refresh News" to get updated articles
4. Articles are displayed in a newspaper cutout style

### Calendar Features
1. Navigate to the Cyber Calendar section
2. Browse through months to see cybersecurity events
3. Click on events for detailed descriptions
4. Events are color-coded by category

### API Usage
```javascript
// Get latest news
fetch('http://localhost:5000/api/news?limit=5')
  .then(response => response.json())
  .then(data => console.log(data.articles));

// Search news
fetch('http://localhost:5000/api/news/search?q=ransomware')
  .then(response => response.json())
  .then(data => console.log(data.articles));
```

## 🎨 Design Features

### Newspaper Style
- **Authentic newspaper typography** using Times New Roman and Georgia fonts
- **Rotated article cards** for realistic cutout effect
- **Vintage color scheme** with proper contrast
- **Responsive grid layout** adapting to screen sizes

### UI Improvements
- **Enhanced animations** with smooth transitions
- **Better spacing and typography** for improved readability
- **Modern color gradients** and visual effects
- **Mobile-first responsive design**

## 🔍 Troubleshooting

### Common Issues

**News not loading:**
- Check if the Flask API is running on port 5000
- Verify internet connection for news scraping
- Check browser console for JavaScript errors

**Scraping errors:**
- The scraper includes fallback mechanisms
- Demo data will load if scraping fails
- Check the console logs for detailed error messages

**CORS issues:**
- Ensure Flask-CORS is installed
- API server must be running for frontend to access news

### Performance Tips

**For better performance:**
- Use the lightweight extractive summarization (default)
- Limit the number of articles scraped (default: 10-15)
- Enable caching by keeping the API server running

**For better summarization quality:**
- Install Hugging Face transformers
- Set `use_local_model=True` in the scraper
- Note: This requires more system resources

## 📄 File Structure

```
Cyber Reach Website/
├── index.html                 # Main website
├── html/
│   ├── calendar.html          # Enhanced cyber calendar
│   ├── projects.html          # Projects page
│   ├── blogs.html            # Blogs page
│   └── aboutus.html          # About page
├── css/
│   └── style.css             # Enhanced styles with newspaper design
├── js/
│   ├── script.js             # Main website functionality
│   ├── news-integration.js   # News display and management
│   └── cyber-events.js       # Calendar event management
├── backend/
│   ├── cyber_news_scraper.py # Enhanced news scraper
│   ├── news_api.py           # Flask API server
│   ├── requirements.txt      # Python dependencies
│   └── setup.py             # Setup script
└── README.md                 # This file
```

## 🚀 Deployment

### GitHub Pages (Frontend Only)
1. Fork this repository
2. Go to Settings > Pages
3. Select source: Deploy from a branch
4. Choose `main` branch and `/` (root) folder
5. Your site will be available at `https://yourusername.github.io/CybeReach/`

### Full Deployment with Backend
For full functionality including news scraping:

1. **Frontend**: Deploy to GitHub Pages, Netlify, or Vercel
2. **Backend**: Deploy to Heroku, Railway, or any cloud provider
3. **Update API URL**: Modify `window.CYBER_NEWS_API_URL` in `index.html`

### Local Development
```bash
# Clone the repository
git clone https://github.com/CybeReach/CybeReach.git
cd CybeReach

# Set up backend
cd backend
pip install -r requirements.txt
python news_api.py

# Serve frontend (in another terminal)
cd ..
python -m http.server 8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex functionality

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Hugging Face** for open-source NLP models
- **Economic Times** for cybersecurity news content
- **Flask** and **BeautifulSoup** communities
- **Open source contributors** who made this possible

---

**Built with ❤️ for the cybersecurity community**
