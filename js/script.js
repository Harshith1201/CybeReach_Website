document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menuIcon');
  const navList = document.getElementById('navList');

  menuIcon.addEventListener('click', function () {
    navList.classList.toggle('active');
  });

  // Close the menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.navbar')) {
      navList.classList.remove('active');
    }
  });

  const sections = document.querySelectorAll('.animated');

  // Create an Intersection Observer
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Add or remove the 'in-view' class based on visibility
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  });

  // Observe the animated sections
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  const socialIcons = document.querySelectorAll('.social-icons img');

  // Add a simple hover animation for social icons
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', function () {
      icon.style.transform = 'scale(1.2)';
    });

    icon.addEventListener('mouseout', function () {
      icon.style.transform = 'scale(1)';
    });
  });

  const footer = document.querySelector('footer');
  const footerElements = document.querySelectorAll('footer *');

  // Add rounded edges to the footer
  footer.style.borderTopLeftRadius = '60px';
  footer.style.borderTopRightRadius = '60px';

  // Function to add rounded edges
  const addRoundedEdges = () => {
    footerElements.forEach(element => {
      element.style.borderRadius = '15px';
    });
  };

  // Observer to trigger rounded edges when the footer comes into view
  const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addRoundedEdges();
      }
    });
  });

  // Observe the footer
  footerObserver.observe(footer);
});

// Function to scroll to news section
function scrollToNews() {
  const newsSection = document.querySelector('.cyber-news-section');
  if (newsSection) {
    newsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Smart floating button visibility
document.addEventListener('DOMContentLoaded', function() {
  const floatingBtn = document.querySelector('.floating-news-btn');
  const newsSection = document.querySelector('.cyber-news-section');

  if (floatingBtn && newsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hide button when news section is visible
          floatingBtn.style.opacity = '0.3';
          floatingBtn.style.transform = 'translateY(10px) scale(0.8)';
        } else {
          // Show button when news section is not visible
          floatingBtn.style.opacity = '1';
          floatingBtn.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, {
      threshold: 0.3 // Trigger when 30% of news section is visible
    });

    observer.observe(newsSection);
  }
});
