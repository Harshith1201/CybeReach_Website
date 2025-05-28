# 🌐 CybeReach Website - Sharing Instructions

## 🚀 Quick Start

### Option 1: Use the Batch File (Easiest)
1. Double-click `start_servers.bat`
2. Wait for both servers to start
3. Share the network link with others: **http://192.168.1.7:8000**

### Option 2: Manual Start
1. **Start Backend API:**
   ```bash
   cd "Cyber Reach Website/backend"
   python setup.py
   ```

2. **Start Frontend (in new terminal):**
   ```bash
   cd "Cyber Reach Website"
   python -m http.server 8000
   ```

## 🔗 Access Links

### For You (Local):
- **Website:** http://localhost:8000
- **API:** http://localhost:5000

### For Others (Network):
- **Website:** http://192.168.1.7:8000
- **API:** http://192.168.1.7:5000

## 📱 Features

### ✅ What's Working:
- **🔒 Cyber Intelligence Dashboard** with real-time threat monitoring
- **📰 Live News Scraping** from Economic Times cybersecurity section
- **🤖 AI-Powered Summarization** using Hugging Face models
- **📊 Enhanced News Display** with 6 bullet points for main stories
- **⚡ Threat Alerts** with 5 sidebar stories and priority levels
- **🎯 Smart Features:** Threat tags, impact assessment, auto-refresh
- **📱 Responsive Design** that works on all devices
- **🎨 Cyber Theme** with dark gradients and glowing effects

### 🎯 Special Features:
- **"Want to know what's on the news?"** button that smoothly scrolls to news
- **Dynamic threat level monitoring** (High/Medium/Low)
- **Clever cybersecurity quotes** that rotate on each visit
- **Professional intelligence styling** like a real SOC dashboard

## 🔧 Troubleshooting

### If Others Can't Access:
1. **Check Windows Firewall:**
   - Allow Python through firewall
   - Or temporarily disable firewall for testing

2. **Verify Network:**
   - Make sure you're on the same WiFi/network
   - Try pinging 192.168.1.7 from their device

3. **Alternative IP:**
   - If 192.168.1.7 doesn't work, check your actual IP:
   ```bash
   ipconfig
   ```
   - Look for "IPv4 Address" under your network adapter
   - Replace 192.168.1.7 with your actual IP

## 🎉 What People Will See

When others visit your link, they'll experience:

1. **🏠 Beautiful Homepage** with CybeReach branding
2. **📰 News Peek Button** in the About section
3. **🔒 Cyber Intelligence Section** with:
   - Live cybersecurity news
   - Professional threat analysis
   - Interactive elements and animations
   - Real-time updates every 30 minutes

## 📞 Support

If you need help:
- Check that both servers are running
- Verify the IP address is correct
- Ensure firewall allows connections
- Test locally first (localhost:8000)

---

**🎯 Your CybeReach website is now ready to share with the world!** 🌍
