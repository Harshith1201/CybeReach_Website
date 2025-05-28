document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const calendarEvents = document.querySelectorAll('#leftcal h3');
    const highlightedDates = document.querySelectorAll('#rightcal #eve');
    const dropdownBtn = document.getElementById('menuIcon');
    const navList = document.getElementById('navList');

    const hoverColor = '#003A6D'; // Dark blue
    const hoverTextColor = '#FFFFFF'; // White
    const hoverBgColor = '#ff9999'; // Light red
    const hoverTextGray = '#141115'; // Dark grayish black
    const hoverDateBgColor = '#e6f7ff'; // Light blue
    const hoverDateTextColor = '#003A6D'; // Dark blue

    const transition = 'background-color 0.3s ease-in-out, color 0.3s ease-in-out';

    // Function to toggle dropdown menu
    function toggleDropdownMenu() {
        navList.classList.toggle('active');
    }

    dropdownBtn.addEventListener('click', toggleDropdownMenu);

    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            link.style.backgroundColor = hoverColor;
            link.style.color = hoverTextColor;
            link.style.transition = transition;
        });
        link.addEventListener('mouseout', function() {
            link.style.backgroundColor = 'transparent';
            link.style.color = hoverTextGray;
            link.style.transition = transition;
        });
    });

    calendarEvents.forEach(event => {
        event.addEventListener('mouseover', function() {
            event.style.backgroundColor = hoverBgColor;
            event.style.color = hoverTextGray;
            event.style.transition = transition;
        });
        event.addEventListener('mouseout', function() {
            event.style.backgroundColor = 'transparent';
            event.style.color = '#c94c4c'; // Vibrant red text on mouseout
            event.style.transition = transition;
        });
    });

    highlightedDates.forEach(date => {
        date.addEventListener('mouseover', function() {
            date.style.backgroundColor = hoverDateBgColor;
            date.style.transition = transition;
            date.style.color = hoverDateTextColor;
        });
        date.addEventListener('mouseout', function() {
            date.style.backgroundColor = 'transparent';
            date.style.color = '#c94c4c'; // Vibrant red text on mouseout
            date.style.transition = transition;
        });
    });

    
});

