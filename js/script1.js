document.addEventListener("DOMContentLoaded", function () {
  // Get the elements for animation
  const leftContent = document.querySelector(".left-content");
  const rightContent = document.querySelector(".right-content");

  // Add animation class to trigger entrance animation
  leftContent.classList.add("slideInLeft");
  rightContent.classList.add("slideInRight");

  // Remove the animation classes after animation is complete
  leftContent.addEventListener("animationend", function () {
      leftContent.classList.remove("slideInLeft");
  });

  rightContent.addEventListener("animationend", function () {
      rightContent.classList.remove("slideInRight");
  });
});
const teamMembers = document.querySelectorAll('.team-member');

// Options for the IntersectionObserver
const options = {
  threshold: 0.5, // Trigger when 50% of the element is in view
};

// Callback function for the IntersectionObserver
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add a CSS class to trigger animation
      entry.target.classList.add('animate');
      // Stop observing this element
      observer.unobserve(entry.target);
    }
  });
};

// Create a new IntersectionObserver
const observer = new IntersectionObserver(callback, options);

// Observe each team member
teamMembers.forEach((member) => {
  observer.observe(member);
});

