# Contributing to CybeReach

Thank you for your interest in contributing to CybeReach! We welcome contributions from the cybersecurity community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/CybeReach.git
   cd CybeReach
   ```
3. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Setup

### Prerequisites
- Python 3.7+
- Modern web browser
- Git

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python news_api.py
```

### Frontend Setup
```bash
# Serve the frontend
python -m http.server 8000
```

## 📝 Contribution Guidelines

### Code Style
- Use consistent indentation (2 spaces for HTML/CSS/JS, 4 spaces for Python)
- Follow existing naming conventions
- Add comments for complex functionality
- Keep functions small and focused

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Add detailed description if needed

Example:
```
Add news refresh functionality

- Implement automatic news refresh every 30 minutes
- Add manual refresh button to news section
- Handle API errors gracefully
```

### Pull Request Process
1. **Update documentation** if you're changing functionality
2. **Test your changes** thoroughly
3. **Update the README** if you're adding new features
4. **Submit a pull request** with a clear description

## 🐛 Bug Reports

When reporting bugs, please include:
- **Browser and version**
- **Operating system**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** if applicable

## 💡 Feature Requests

For new features:
- **Check existing issues** first
- **Describe the use case** clearly
- **Explain why** it would be valuable
- **Consider implementation** complexity

## 🔒 Security

If you discover a security vulnerability:
- **DO NOT** open a public issue
- **Email us** at cybereach@gmail.com
- **Include details** about the vulnerability
- **Wait for confirmation** before disclosure

## 📋 Areas for Contribution

- **News scraping improvements**
- **UI/UX enhancements**
- **Calendar event additions**
- **Performance optimizations**
- **Documentation updates**
- **Bug fixes**
- **Testing**

## 🙏 Recognition

Contributors will be:
- **Listed in the README**
- **Credited in release notes**
- **Mentioned in social media** (if desired)

Thank you for helping make CybeReach better! 🛡️
