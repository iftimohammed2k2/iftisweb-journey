// script.js

// Example: log to console when keys are clicked
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    console.log('Key pressed!');
  });
});
