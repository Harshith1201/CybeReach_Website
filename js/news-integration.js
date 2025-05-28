/**
 * News Integration for CybeReach Website
 * Handles fetching and displaying cybersecurity news with newspaper design
 */

class NewsManager {
    constructor() {
        // Use environment variable or fallback to localhost
        this.apiBaseUrl = window.CYBER_NEWS_API_URL || 'http://localhost:5000/api';
        this.newsData = [];
        this.isLoading = false;
        this.lastUpdate = null;

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        console.log('🚀 Initializing News Manager...');
        await this.loadNews();
        this.setupEventListeners();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        // Refresh button
        const refreshBtn = document.getElementById('news-refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshNews());
        }

        // Search functionality
        const searchInput = document.getElementById('news-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchNews(e.target.value));
        }
    }

    async loadNews() {
        if (this.isLoading) return;

        this.isLoading = true;
        this.showLoadingState();

        try {
            console.log('📰 Fetching news from API...');
            const response = await fetch(`${this.apiBaseUrl}/news?limit=10`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && data.articles) {
                this.newsData = data.articles;
                this.lastUpdate = data.last_update;
                this.displayNews();
                console.log(`✅ Loaded ${this.newsData.length} articles`);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('❌ Error loading news:', error);
            this.showErrorState();
            // Load demo data as fallback
            this.loadDemoData();
        } finally {
            this.isLoading = false;
        }
    }

    loadDemoData() {
        console.log('📋 Loading demo news data...');
        this.newsData = [
            {
                title: "Major Cybersecurity Breach Affects Millions",
                date: "2024-05-26",
                summary: "A significant data breach has been discovered affecting multiple organizations worldwide, compromising sensitive user data and financial information.",
                bullet_summary: "• Data breach affects over 10 million users\n• Investigation ongoing by cybersecurity experts\n• Companies urged to update security protocols\n• Financial institutions implementing emergency measures\n• Users advised to change passwords immediately\n• Law enforcement agencies coordinating response",
                url: "#"
            },
            {
                title: "New AI-Powered Security Tool Launched",
                date: "2024-05-25",
                summary: "Revolutionary AI technology promises to detect threats 10x faster than traditional methods, using advanced machine learning algorithms.",
                bullet_summary: "• AI detects threats in real-time\n• 99.9% accuracy rate in testing\n• Available for enterprise customers\n• Reduces false positives by 85%\n• Integrates with existing security infrastructure",
                url: "#"
            },
            {
                title: "Ransomware Attacks Increase by 40%",
                date: "2024-05-24",
                summary: "Security researchers report a significant increase in ransomware attacks targeting small businesses across multiple industries.",
                bullet_summary: "• 40% increase in ransomware attacks\n• Small businesses primary targets\n• New prevention strategies recommended\n• Healthcare sector particularly vulnerable\n• Average ransom demand reaches $2.3 million",
                url: "#"
            },
            {
                title: "Critical Zero-Day Vulnerability Discovered",
                date: "2024-05-23",
                summary: "A critical zero-day vulnerability has been found in widely-used enterprise software, affecting millions of systems globally.",
                bullet_summary: "• Zero-day affects enterprise software\n• Millions of systems at risk\n• Emergency patches being developed\n• Immediate mitigation steps recommended",
                url: "#"
            },
            {
                title: "State-Sponsored Cyber Espionage Campaign Exposed",
                date: "2024-05-22",
                summary: "International cybersecurity agencies have uncovered a sophisticated state-sponsored espionage campaign targeting government infrastructure.",
                bullet_summary: "• State-sponsored campaign discovered\n• Government infrastructure targeted\n• Multiple countries affected\n• Advanced persistent threat identified",
                url: "#"
            },
            {
                title: "Cryptocurrency Exchange Security Breach",
                date: "2024-05-21",
                summary: "A major cryptocurrency exchange reports a security breach resulting in the theft of digital assets worth millions of dollars.",
                bullet_summary: "• Cryptocurrency exchange breached\n• Millions in digital assets stolen\n• Trading temporarily suspended\n• Users advised to secure wallets",
                url: "#"
            },
            {
                title: "IoT Botnet Targets Smart Home Devices",
                date: "2024-05-20",
                summary: "Cybersecurity researchers have identified a new IoT botnet specifically targeting smart home devices and routers.",
                bullet_summary: "• IoT botnet targets smart homes\n• Routers and devices compromised\n• Default passwords exploited\n• Firmware updates recommended",
                url: "#"
            },
            {
                title: "Phishing Campaign Uses AI-Generated Content",
                date: "2024-05-19",
                summary: "A sophisticated phishing campaign has been discovered using AI-generated content to create highly convincing fake emails and websites.",
                bullet_summary: "• AI-generated phishing content\n• Highly convincing fake emails\n• Traditional detection methods bypassed\n• New security awareness needed",
                url: "#"
            },
            {
                title: "Supply Chain Attack Compromises Software Updates",
                date: "2024-05-18",
                summary: "A supply chain attack has been discovered that compromises legitimate software updates to distribute malware to end users.",
                bullet_summary: "• Supply chain attack identified\n• Legitimate updates compromised\n• Malware distributed to users\n• Software vendors investigating",
                url: "#"
            },
            {
                title: "Cloud Infrastructure Targeted by Advanced Persistent Threat",
                date: "2024-05-17",
                summary: "Security researchers have identified a sophisticated APT group targeting cloud infrastructure across multiple industries with custom malware.",
                bullet_summary: "• APT group targets cloud infrastructure\n• Custom malware deployed\n• Multiple industries affected\n• Advanced evasion techniques used\n• Cloud security protocols updated",
                url: "#"
            },
            {
                title: "Mobile Banking Trojan Steals Two-Factor Authentication Codes",
                date: "2024-05-16",
                summary: "A new mobile banking trojan has been discovered that can intercept SMS-based two-factor authentication codes and bypass security measures.",
                bullet_summary: "• Mobile banking trojan identified\n• 2FA codes intercepted\n• Security measures bypassed\n• Banking apps targeted\n• Users advised to use app-based 2FA",
                url: "#"
            },
            {
                title: "Critical Infrastructure Faces Coordinated Cyber Attacks",
                date: "2024-05-15",
                summary: "Government agencies report coordinated cyber attacks targeting critical infrastructure including power grids and water treatment facilities.",
                bullet_summary: "• Critical infrastructure targeted\n• Power grids affected\n• Water treatment facilities compromised\n• Government response activated\n• Emergency protocols implemented",
                url: "#"
            },
            {
                title: "Healthcare Data Breach Exposes Patient Records",
                date: "2024-05-14",
                summary: "A major healthcare provider reports a data breach that exposed sensitive patient records including medical histories and personal information.",
                bullet_summary: "• Healthcare provider breached\n• Patient records exposed\n• Medical histories compromised\n• Personal information stolen\n• HIPAA violation investigation launched",
                url: "#"
            },
            {
                title: "Deepfake Technology Used in Business Email Compromise",
                date: "2024-05-13",
                summary: "Cybercriminals are now using deepfake audio technology to impersonate executives in business email compromise attacks.",
                bullet_summary: "• Deepfake audio technology used\n• Executives impersonated\n• Business email compromise attacks\n• Voice authentication bypassed\n• New detection methods needed",
                url: "#"
            },
            {
                title: "Quantum Computing Threat to Current Encryption Methods",
                date: "2024-05-12",
                summary: "Researchers warn that advances in quantum computing pose a significant threat to current encryption methods used to protect sensitive data.",
                bullet_summary: "• Quantum computing advances\n• Current encryption threatened\n• Sensitive data at risk\n• Post-quantum cryptography needed\n• Timeline for transition discussed",
                url: "#"
            },
            {
                title: "Social Engineering Attacks Increase During Remote Work",
                date: "2024-05-11",
                summary: "Security experts report a significant increase in social engineering attacks targeting remote workers and home office environments.",
                bullet_summary: "• Social engineering attacks rise\n• Remote workers targeted\n• Home office vulnerabilities\n• Employee training needed\n• Security awareness programs expanded",
                url: "#"
            },
            {
                title: "Automotive Cybersecurity Vulnerabilities Discovered",
                date: "2024-05-10",
                summary: "Security researchers have identified critical vulnerabilities in connected vehicle systems that could allow remote access to car controls.",
                bullet_summary: "• Connected vehicle vulnerabilities found\n• Remote access to car controls possible\n• Critical safety implications\n• Automotive industry response required\n• Software patches being developed",
                url: "#"
            }
        ];
        this.displayNews();
    }

    displayNews() {
        const newsContainer = document.getElementById('cyber-news-container');
        if (!newsContainer) {
            console.warn('News container not found');
            return;
        }

        if (!this.newsData || this.newsData.length === 0) {
            newsContainer.innerHTML = this.getNoNewsHTML();
            return;
        }

        const mainStory = this.newsData[0];
        const sidebarStories = this.newsData.slice(1, 4); // Show 3 sidebar stories to eliminate empty space
        const additionalStories = this.newsData.slice(4, 7); // Get 3 stories for bottom section
        const cleverQuote = this.getCleverQuote();

        newsContainer.innerHTML = `
            <div class="newspaper-container">
                <div class="newspaper-header">
                    <div class="cyber-badge">🔒 CYBER REACH INTELLIGENCE 🔒</div>
                    <h1 class="newspaper-title">CYBER SECURITY TIMES</h1>
                    <p class="newspaper-subtitle">Latest Cybersecurity News & Threat Intelligence</p>
                    <div class="clever-quote">
                        <span class="quote-icon">💡</span>
                        <span class="quote-text">${cleverQuote}</span>
                    </div>
                    ${this.lastUpdate ? `<p class="last-update">🕒 Last updated: ${this.formatDate(this.lastUpdate)}</p>` : ''}
                </div>

                <div class="newspaper-grid">
                    <div class="main-story-section">
                        <div class="section-header">
                            <h2 class="section-title">🚨 BREAKING INTELLIGENCE</h2>
                            <div class="section-divider"></div>
                        </div>
                        <div class="main-story">
                            ${this.renderMainStory(mainStory)}
                        </div>
                    </div>

                    <div class="sidebar-section">
                        <div class="section-header">
                            <h2 class="section-title">⚡ THREAT ALERTS</h2>
                            <div class="section-divider"></div>
                        </div>
                        <div class="sidebar-stories">
                            ${sidebarStories.map(story => this.renderSidebarStory(story)).join('')}
                        </div>
                    </div>
                </div>

                ${additionalStories.length > 0 ? `
                <div class="additional-stories-section">
                    <div class="section-header">
                        <h2 class="section-title">📊 INTELLIGENCE BRIEFINGS</h2>
                        <div class="section-divider"></div>
                    </div>
                    <div class="additional-stories-grid">
                        ${additionalStories.map(story => this.renderAdditionalStory(story)).join('')}
                    </div>
                </div>
                ` : ''}

                <div class="news-actions">
                    <button id="news-refresh-btn" class="news-refresh-btn">
                        <span class="refresh-icon">🔄</span> Refresh Intelligence
                    </button>
                    <div class="threat-level">
                        <span class="threat-indicator ${this.getThreatLevel()}"></span>
                        <span class="threat-text">Threat Level: ${this.getThreatLevel().toUpperCase()}</span>
                    </div>
                </div>
            </div>
        `;

        // Re-attach event listeners
        this.setupEventListeners();
    }

    renderMainStory(story) {
        const bullets = this.formatBulletPoints(story.bullet_summary || story.summary, true);
        const threatTags = this.extractThreatTags(story.title + ' ' + story.summary);

        return `
            <div class="story-header">
                <span class="breaking-badge">🚨 BREAKING</span>
                <h2 class="story-headline">${this.escapeHtml(story.title)}</h2>
            </div>
            <div class="story-meta">
                <span class="story-date">📅 ${this.formatDate(story.date)}</span>
                <span class="story-category">🔐 CYBERSECURITY ALERT</span>
            </div>
            <div class="threat-tags">
                ${threatTags.map(tag => `<span class="threat-tag">${tag}</span>`).join('')}
            </div>
            <p class="story-summary">${this.escapeHtml(story.summary || '')}</p>
            <div class="story-bullets">
                <h4>🎯 Critical Intelligence Points:</h4>
                <ul>
                    ${bullets.map(bullet => `<li>${this.escapeHtml(bullet)}</li>`).join('')}
                </ul>
            </div>
            <div class="story-impact">
                <h4>📊 Impact Assessment:</h4>
                <div class="impact-meter">
                    <span class="impact-level ${this.getImpactLevel(story)}"></span>
                    <span class="impact-text">${this.getImpactLevel(story).toUpperCase()} IMPACT</span>
                </div>
            </div>
            ${story.url && story.url !== '#' ? `<button class="read-more-btn" onclick="window.open('${story.url}', '_blank')">🔗 Read Full Intelligence Report</button>` : ''}
        `;
    }

    renderSidebarStory(story) {
        const bullets = this.formatBulletPoints(story.bullet_summary || story.summary, false);
        const threatTags = this.extractThreatTags(story.title + ' ' + story.summary);

        return `
            <div class="sidebar-story">
                <div class="sidebar-header">
                    <span class="alert-badge">⚡ ALERT</span>
                    <h3 class="sidebar-headline">${this.escapeHtml(story.title)}</h3>
                </div>
                <div class="sidebar-meta">
                    <span class="sidebar-date">📅 ${this.formatDate(story.date)}</span>
                    <span class="priority-level ${this.getImpactLevel(story)}">
                        ${this.getImpactLevel(story).toUpperCase()} PRIORITY
                    </span>
                </div>
                <div class="sidebar-threat-tags">
                    ${threatTags.slice(0, 2).map(tag => `<span class="mini-threat-tag">${tag}</span>`).join('')}
                </div>
                <p class="sidebar-summary">${this.escapeHtml(this.truncateText(story.summary || '', 100))}</p>
                <div class="sidebar-bullets">
                    <ul>
                        ${bullets.slice(0, 3).map(bullet => `<li>${this.escapeHtml(bullet)}</li>`).join('')}
                    </ul>
                </div>
                ${story.url && story.url !== '#' ? `<button class="sidebar-read-btn" onclick="window.open('${story.url}', '_blank')">🔗 View Report</button>` : ''}
            </div>
        `;
    }

    renderAdditionalStory(story) {
        const bullets = this.formatBulletPoints(story.bullet_summary || story.summary, false);
        const threatTags = this.extractThreatTags(story.title + ' ' + story.summary);

        return `
            <div class="additional-story">
                <div class="additional-story-header">
                    <span class="intel-badge">📊 INTEL</span>
                    <h3 class="additional-headline">${this.escapeHtml(story.title)}</h3>
                </div>
                <div class="additional-meta">
                    <span class="additional-date">📅 ${this.formatDate(story.date)}</span>
                    <span class="severity-level ${this.getImpactLevel(story)}">
                        ${this.getImpactLevel(story).toUpperCase()}
                    </span>
                </div>
                <div class="additional-threat-tags">
                    ${threatTags.slice(0, 2).map(tag => `<span class="mini-threat-tag">${tag}</span>`).join('')}
                </div>
                <p class="additional-summary">${this.escapeHtml(this.truncateText(story.summary || '', 120))}</p>
                <div class="additional-bullets">
                    <ul>
                        ${bullets.slice(0, 2).map(bullet => `<li>${this.escapeHtml(bullet)}</li>`).join('')}
                    </ul>
                </div>
                ${story.url && story.url !== '#' ? `<button class="additional-read-btn" onclick="window.open('${story.url}', '_blank')">📖 Read More</button>` : ''}
            </div>
        `;
    }

    formatBulletPoints(text, isMainStory = false) {
        if (!text) return ['No additional details available'];

        // Split by bullet points, newlines, and periods
        let bullets = text.split(/[•\n.]/).filter(item => item.trim().length > 15);

        if (bullets.length === 0) {
            // If no bullets found, create some from the text
            const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 15);
            bullets = sentences.slice(0, isMainStory ? 6 : 3).map(s => s.trim());
        }

        // Clean and enhance bullets
        bullets = bullets.map(bullet => {
            bullet = bullet.trim();
            // Remove common prefixes
            bullet = bullet.replace(/^(The|A|An|This|That|It|There)\s+/i, '');
            // Ensure it starts with capital letter
            bullet = bullet.charAt(0).toUpperCase() + bullet.slice(1);
            // Add period if missing
            if (!bullet.endsWith('.') && !bullet.endsWith('!') && !bullet.endsWith('?')) {
                bullet += '.';
            }
            return bullet;
        }).filter(bullet => bullet.length > 10);

        // Return more bullets for main story
        const maxBullets = isMainStory ? 6 : 3;
        return bullets.slice(0, maxBullets);
    }

    formatDate(dateString) {
        if (!dateString) return 'Unknown date';

        try {
            // Handle various date formats
            let date;

            // Check if it's already a formatted string like "Last Updated: May 25, 2025, 05:28:00 PM IST"
            if (dateString.includes('Last Updated:')) {
                const dateMatch = dateString.match(/(\w+ \d{1,2}, \d{4})/);
                if (dateMatch) {
                    date = new Date(dateMatch[1]);
                } else {
                    return 'Recent';
                }
            } else if (dateString.includes('T')) {
                // ISO format
                date = new Date(dateString);
            } else {
                // Try parsing as-is
                date = new Date(dateString);
            }

            // Check if date is valid
            if (isNaN(date.getTime())) {
                // Try to extract just the date part if it's a complex string
                const simpleDate = dateString.replace(/Last Updated:\s*/i, '').split(',')[0];
                date = new Date(simpleDate);

                if (isNaN(date.getTime())) {
                    return 'Recent';
                }
            }

            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.warn('Date parsing error:', error, 'for date:', dateString);
            return 'Recent';
        }
    }

    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showLoadingState() {
        const newsContainer = document.getElementById('cyber-news-container');
        if (newsContainer) {
            newsContainer.innerHTML = `
                <div class="newspaper-container">
                    <div class="newspaper-header">
                        <h1 class="newspaper-title">CYBER SECURITY TIMES</h1>
                        <p class="newspaper-subtitle">Loading latest news...</p>
                    </div>
                    <div class="loading-state">
                        <div class="loading-spinner"></div>
                        <p>Fetching the latest cybersecurity news...</p>
                    </div>
                </div>
            `;
        }
    }

    showErrorState() {
        const newsContainer = document.getElementById('cyber-news-container');
        if (newsContainer) {
            newsContainer.innerHTML = `
                <div class="newspaper-container">
                    <div class="newspaper-header">
                        <h1 class="newspaper-title">CYBER SECURITY TIMES</h1>
                        <p class="newspaper-subtitle">Unable to load news</p>
                    </div>
                    <div class="error-state">
                        <p>⚠️ Unable to fetch the latest news. Please try again later.</p>
                        <button onclick="newsManager.loadNews()" class="news-refresh-btn">Try Again</button>
                    </div>
                </div>
            `;
        }
    }

    getNoNewsHTML() {
        return `
            <div class="newspaper-container">
                <div class="newspaper-header">
                    <h1 class="newspaper-title">CYBER SECURITY TIMES</h1>
                    <p class="newspaper-subtitle">No news available</p>
                </div>
                <div class="no-news-state">
                    <p>📰 No cybersecurity news available at the moment.</p>
                    <button onclick="newsManager.refreshNews()" class="news-refresh-btn">Refresh News</button>
                </div>
            </div>
        `;
    }

    async refreshNews() {
        console.log('🔄 Refreshing news...');

        try {
            // Trigger backend refresh
            await fetch(`${this.apiBaseUrl}/news/refresh`, { method: 'POST' });

            // Wait a moment for the refresh to process
            setTimeout(() => {
                this.loadNews();
            }, 2000);

        } catch (error) {
            console.error('❌ Error refreshing news:', error);
            // Still try to reload current data
            this.loadNews();
        }
    }

    async searchNews(query) {
        if (!query || query.length < 2) {
            this.displayNews();
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/news/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.success) {
                this.newsData = data.articles;
                this.displayNews();
            }
        } catch (error) {
            console.error('❌ Error searching news:', error);
        }
    }

    startAutoRefresh() {
        // Refresh news every 30 minutes
        setInterval(() => {
            console.log('🔄 Auto-refreshing news...');
            this.loadNews();
        }, 30 * 60 * 1000);
    }

    getCleverQuote() {
        const quotes = [
            "In cybersecurity, paranoia is just good sense.",
            "The only secure computer is one that's unplugged, locked in a safe, and buried in concrete.",
            "Security is not a product, but a process.",
            "Trust, but verify. Then verify again.",
            "In cyber warfare, the best defense is a good offense.",
            "Your password is the key to your digital kingdom.",
            "Cybersecurity: Because your data is worth more than you think.",
            "The weakest link in security is often the human element.",
            "Stay vigilant, stay secure, stay ahead of threats.",
            "In the digital age, privacy is a luxury, security is a necessity."
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    getThreatLevel() {
        const threatKeywords = ['attack', 'breach', 'hack', 'malware', 'ransomware', 'vulnerability'];
        const newsText = this.newsData.slice(0, 3).map(article =>
            (article.title + ' ' + article.summary).toLowerCase()
        ).join(' ');

        const threatCount = threatKeywords.reduce((count, keyword) =>
            count + (newsText.split(keyword).length - 1), 0
        );

        if (threatCount >= 5) return 'high';
        if (threatCount >= 3) return 'medium';
        return 'low';
    }

    extractThreatTags(text) {
        const threatMap = {
            'ransomware': '🔒 Ransomware',
            'malware': '🦠 Malware',
            'phishing': '🎣 Phishing',
            'breach': '💥 Data Breach',
            'vulnerability': '🔓 Vulnerability',
            'attack': '⚔️ Cyber Attack',
            'fraud': '💰 Fraud',
            'scam': '🚨 Scam',
            'hacker': '👤 Threat Actor',
            'cybersecurity': '🛡️ Security'
        };

        const tags = [];
        const lowerText = text.toLowerCase();

        for (const [keyword, tag] of Object.entries(threatMap)) {
            if (lowerText.includes(keyword) && tags.length < 3) {
                tags.push(tag);
            }
        }

        return tags.length > 0 ? tags : ['🔐 Cybersecurity'];
    }

    getImpactLevel(story) {
        const highImpactKeywords = ['million', 'billion', 'critical', 'severe', 'major', 'widespread'];
        const mediumImpactKeywords = ['significant', 'important', 'notable', 'concerning'];

        const text = (story.title + ' ' + story.summary).toLowerCase();

        if (highImpactKeywords.some(keyword => text.includes(keyword))) {
            return 'high';
        }
        if (mediumImpactKeywords.some(keyword => text.includes(keyword))) {
            return 'medium';
        }
        return 'low';
    }


}

// Initialize the news manager
const newsManager = new NewsManager();
