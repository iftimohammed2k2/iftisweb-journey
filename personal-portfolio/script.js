// Select hamburger icon and nav links container
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle the 'active' class on nav-links when hamburger is clicked
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
