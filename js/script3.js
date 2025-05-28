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
});