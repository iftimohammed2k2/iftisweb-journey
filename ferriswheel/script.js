const wheel = document.querySelector('.wheel');
const cabins = document.querySelectorAll('.cabin');

let isAnimating = true;

wheel.addEventListener('click', () => {
  if (isAnimating) {
    wheel.style.animationPlayState = 'paused';
    cabins.forEach(cabin => cabin.style.animationPlayState = 'paused');
  } else {
    wheel.style.animationPlayState = 'running';
    cabins.forEach(cabin => cabin.style.animationPlayState = 'running');
  }
  isAnimating = !isAnimating;
});
