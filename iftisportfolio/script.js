// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // ===== Navbar Hamburger Toggle =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close nav menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // ===== Dark/Light Theme Toggle with localStorage =====
  const toggleThemeBtn = document.querySelector('.toggle-theme');
  const body = document.body;

  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      toggleThemeBtn.textContent = '🌞 Light';
    } else {
      body.classList.remove('dark');
      toggleThemeBtn.textContent = '🌙 Dark';
    }
  }

  // Load theme from localStorage or default light
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  toggleThemeBtn.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ===== Typewriter Effect =====
  const typewriterEl = document.querySelector('.typewriter');
  const phrases = [
    'Junior Web Developer',
    'Frontend Enthusiast',
    'JavaScript Lover',
    'React & PHP Developer',
    'Cybersecurity Learner'
  ];
  let typeIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetween = 1500;

  function type() {
    const currentPhrase = phrases[typeIndex];
    if (!isDeleting) {
      typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, pauseBetween);
      } else {
        setTimeout(type, typingSpeed);
      }
    } else {
      typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, deletingSpeed);
      }
    }
  }
  if (typewriterEl) type();

  // ===== Projects Filter =====
  const filterBtns = document.querySelectorAll('.filters button');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.categories.split(',');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== Modal Project View =====
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  const modalCloseBtn = modal.querySelector('.modal-close');

  function openModal(projectId) {
    // Find project by id (assuming project data is embedded in HTML)
    const projectCard = document.querySelector(`.project-card[data-id="${projectId}"]`);
    if (!projectCard) return;

    // Populate modal content
    const title = projectCard.querySelector('h3').textContent;
    const description = projectCard.dataset.description || 'No description available.';
    const projectLink = projectCard.querySelector('a').href || '#';

    modalContent.innerHTML = `
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${projectLink}" target="_blank" rel="noopener">View Project</a>
    `;
    modal.classList.remove('hidden');

    // Close button event
    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  // Open modal when clicking project card link
  projectCards.forEach(card => {
    const link = card.querySelector('a');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(card.dataset.id);
    });
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close modal on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // ===== Scroll to Top Button =====
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== CLI Easter Egg =====
  const cliModal = document.getElementById('cli-modal');
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');
  const cliCloseBtn = cliModal.querySelector('.modal-close');

  // Command list for CLI
  const commands = {
    help: `Available commands:
- help: Show this help message
- skills: List all skills
- projects: List all projects
- contact: Show contact info
- clear: Clear screen
- close: Close CLI`,
    skills: `Skills:
HTML, CSS, JavaScript, Java, React, C#, PHP, Cybersecurity fundamentals, Node.js, Python`,
    projects: `Projects:
1. Portfolio Website - https://github.com/iftimohammed2k2/portfolio
2. E-commerce Store - https://github.com/iftimohammed2k2/ecommerce
3. Blog Platform - https://github.com/iftimohammed2k2/blog
4. Chat App - https://github.com/iftimohammed2k2/chat-app`,
    contact: `Contact:
Email: iftimohammed2k2@gmail.com
LinkedIn: https://linkedin.com/in/iftimohammed2k2
GitHub: https://github.com/iftimohammed2k2`,
    clear: ''
  };

  function openCLI() {
    cliModal.classList.remove('hidden');
    cliOutput.textContent = 'Welcome to Ifti\'s CLI. Type "help" for commands.\n';
    cliInput.value = '';
    cliInput.focus();
  }

  function closeCLI() {
    cliModal.classList.add('hidden');
  }

  // Open CLI on specific key combo: Ctrl + Shift + I (for fun)
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      if (cliModal.classList.contains('hidden')) {
        openCLI();
      } else {
        closeCLI();
      }
    }
  });

  cliCloseBtn.addEventListener('click', closeCLI);

  cliInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const input = cliInput.value.trim().toLowerCase();
      cliInput.value = '';
      if (!input) return;

      cliOutput.textContent += `> ${input}\n`;

      if (commands.hasOwnProperty(input)) {
        cliOutput.textContent += commands[input] + '\n';
      } else if (input === 'close') {
        closeCLI();
        return;
      } else {
        cliOutput.textContent += `Unknown command: ${input}. Type "help" for list.\n`;
      }

      cliOutput.scrollTop = cliOutput.scrollHeight;
    }
  });

  // ===== GitHub API Integration (for live repo stats) =====
  // Example: Fetch stars count for portfolio repo and update UI
  const githubUser = 'iftimohammed2k2';
  const repoNames = ['portfolio', 'ecommerce', 'blog', 'chat-app'];

  repoNames.forEach(repo => {
    fetch(`https://api.github.com/repos/${githubUser}/${repo}`)
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          const starEl = document.querySelector(`.project-card[data-id="${repo}"] .stars-count`);
          if (starEl) starEl.textContent = `⭐ ${data.stargazers_count}`;
        }
      }).catch(() => {
        // Fail silently
      });
  });

  // ===== Initialize Particle.js background =====
  if (window.particlesJS) {
    particlesJS.load('particles-js', 'particles.json', () => {
      console.log('Particles.js config loaded');
    });
  }
});
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
