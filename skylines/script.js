// script.js

// Example: Toggle window lights on click
document.querySelectorAll('.bb1-window, .bb4-window, .fb2-window, .fb3-window, .fb4-window').forEach(window => {
  window.addEventListener('click', () => {
    // Toggle between on/off
    if (window.style.backgroundColor === 'black') {
      window.style.backgroundColor = '';
    } else {
      window.style.backgroundColor = 'black';
    }
  });
});

// Optional: Add animation effect
window.addEventListener('load', () => {
  document.querySelectorAll('.foreground-buildings div').forEach((building, i) => {
    building.style.opacity = 0;
    building.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
      building.style.opacity = 1;
    }, i * 200);
  });
});
