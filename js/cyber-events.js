// Cyber Events Management System
// Enhanced calendar functionality for CybeReach

class CyberEventsManager {
    constructor() {
        this.events = this.loadCyberEvents();
        this.initializeEventHandlers();
    }

    loadCyberEvents() {
        return [
            // Historical Cybersecurity Milestones
            {
                id: 'morris-worm',
                name: "Morris Worm Released",
                date: "November/2/2024",
                description: "Anniversary of the first major Internet worm (1988) that infected 10% of Internet-connected computers. Created by Robert Tappan Morris Jr., it highlighted the vulnerability of early Internet infrastructure.",
                type: "holiday",
                everyYear: true,
                color: "#ff6b6b",
                category: "historical",
                importance: "high"
            },
            {
                id: 'first-computer-virus',
                name: "First Computer Virus 'Creeper'",
                date: "October/1/2024",
                description: "Anniversary of the Creeper virus (1971), considered the first computer virus that displayed 'I'm the creeper, catch me if you can!'",
                type: "holiday",
                everyYear: true,
                color: "#ff6b6b",
                category: "historical"
            },
            {
                id: 'cybersecurity-awareness-month',
                name: "Cybersecurity Awareness Month",
                date: "October/1/2024",
                description: "National Cybersecurity Awareness Month - promoting cybersecurity best practices across organizations and individuals",
                type: "event",
                everyYear: true,
                color: "#4ecdc4",
                category: "awareness"
            },
            {
                id: 'data-privacy-day',
                name: "Data Privacy Day",
                date: "January/28/2025",
                description: "International Data Privacy Day - raising awareness about privacy rights and data protection practices",
                type: "holiday",
                everyYear: true,
                color: "#45b7d1",
                category: "awareness"
            },
            {
                id: 'safer-internet-day',
                name: "Safer Internet Day",
                date: "February/11/2025",
                description: "Global initiative promoting safer and more responsible use of online technology, especially for young people",
                type: "holiday",
                everyYear: true,
                color: "#96ceb4",
                category: "awareness"
            },
            
            // Important People in Cybersecurity
            {
                id: 'kevin-mitnick-birthday',
                name: "Kevin Mitnick Birthday",
                date: "August/6/2024",
                description: "Birthday of famous hacker turned security consultant (1963-2023). Known as 'The World's Most Wanted Hacker'",
                type: "event",
                everyYear: true,
                color: "#feca57",
                category: "people"
            },
            {
                id: 'john-mcafee-birthday',
                name: "John McAfee Birthday",
                date: "September/18/2024",
                description: "Birthday of antivirus software pioneer and founder of McAfee (1945-2021)",
                type: "event",
                everyYear: true,
                color: "#ff9ff3",
                category: "people"
            },
            {
                id: 'eugene-kaspersky-birthday',
                name: "Eugene Kaspersky Birthday",
                date: "October/4/2024",
                description: "Birthday of Russian cybersecurity expert and founder of Kaspersky Lab (born 1965)",
                type: "event",
                everyYear: true,
                color: "#ff9ff3",
                category: "people"
            },
            
            // Major Cybersecurity Conferences 2025
            {
                id: 'rsa-conference-2025',
                name: "RSA Conference 2025",
                date: "May/6/2025",
                description: "World's leading cybersecurity conference in San Francisco. Expected 40,000+ attendees",
                type: "event",
                color: "#54a0ff",
                category: "conference"
            },
            {
                id: 'black-hat-usa-2025',
                name: "Black Hat USA 2025",
                date: "August/2/2025",
                description: "Premier cybersecurity event for information security professionals in Las Vegas",
                type: "event",
                color: "#2f3542",
                category: "conference"
            },
            {
                id: 'defcon-33',
                name: "DEF CON 33",
                date: "August/7/2025",
                description: "World's largest hacker convention in Las Vegas. Community-driven cybersecurity event",
                type: "event",
                color: "#ff3838",
                category: "conference"
            },
            {
                id: 'bsides-sf-2025',
                name: "BSides San Francisco 2025",
                date: "April/26/2025",
                description: "Community-driven cybersecurity conference focusing on emerging threats and technologies",
                type: "event",
                color: "#00d2d3",
                category: "conference"
            },
            
            // Cybersecurity Awareness Events
            {
                id: 'world-password-day',
                name: "World Password Day",
                date: "May/2/2025",
                description: "Annual event promoting better password security practices and multi-factor authentication",
                type: "holiday",
                everyYear: true,
                color: "#3742fa",
                category: "awareness"
            },
            {
                id: 'anti-phishing-day',
                name: "Anti-Phishing Working Group Day",
                date: "June/15/2025",
                description: "Awareness day for phishing prevention and education initiatives",
                type: "holiday",
                everyYear: true,
                color: "#2ed573",
                category: "awareness"
            },
            {
                id: 'world-backup-day',
                name: "World Backup Day",
                date: "March/31/2025",
                description: "Annual reminder to backup important data and prepare for potential data loss",
                type: "holiday",
                everyYear: true,
                color: "#ff6b6b",
                category: "awareness"
            },
            
            // Historical Cyber Attacks (Educational)
            {
                id: 'wannacry-anniversary',
                name: "WannaCry Ransomware Anniversary",
                date: "May/12/2025",
                description: "Anniversary of the 2017 global ransomware attack that affected 300,000+ computers worldwide",
                type: "event",
                everyYear: true,
                color: "#ff4757",
                category: "historical"
            },
            {
                id: 'equifax-breach-anniversary',
                name: "Equifax Breach Anniversary",
                date: "September/7/2025",
                description: "Anniversary of the 2017 Equifax data breach affecting 147 million people",
                type: "event",
                everyYear: true,
                color: "#ff6348",
                category: "historical"
            },
            {
                id: 'target-breach-anniversary',
                name: "Target Data Breach Anniversary",
                date: "December/15/2025",
                description: "Anniversary of the 2013 Target data breach affecting 40+ million customers",
                type: "event",
                everyYear: true,
                color: "#ff6348",
                category: "historical"
            }
        ];
    }

    initializeEventHandlers() {
        // Add event listeners for calendar interactions
        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceCalendarAccessibility();
        });
    }

    enhanceCalendarAccessibility() {
        // Make calendar events more accessible
        const calendarEvents = document.querySelectorAll('.event-container');
        calendarEvents.forEach(event => {
            event.setAttribute('role', 'button');
            event.setAttribute('tabindex', '0');
            event.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    event.click();
                }
            });
        });
    }

    getEventsByCategory(category) {
        return this.events.filter(event => event.category === category);
    }

    getUpcomingEvents(days = 30) {
        const today = new Date();
        const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
        
        return this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= futureDate;
        });
    }

    searchEvents(query) {
        const searchTerm = query.toLowerCase();
        return this.events.filter(event => 
            event.name.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
    }
}

// Initialize the Cyber Events Manager
const cyberEventsManager = new CyberEventsManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CyberEventsManager;
}
