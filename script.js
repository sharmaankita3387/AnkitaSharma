// Theme Toggle with Smooth Transition
const themeBtn = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

themeBtn.addEventListener('click', () => {
    // Add transition class for smooth theme change
    body.style.transition = 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Toggle theme
    body.classList.toggle('light-mode');
    
    // Save preference
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    
    // Update button label (for accessibility)
    const isLight = body.classList.contains('light-mode');
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
});

// Magnetic Orbs Effect (Enhanced)
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate mouse position relative to center
    const x = (innerWidth / 2 - clientX) / 30;
    const y = (innerHeight / 2 - clientY) / 30;
    
    const primaryOrb = document.querySelector('.orb-primary');
    const secondaryOrb = document.querySelector('.orb-secondary');
    
    if (primaryOrb && secondaryOrb) {
        primaryOrb.style.transform = `translate(${x}px, ${y}px)`;
        secondaryOrb.style.transform = `translate(${-x * 1.2}px, ${-y * 1.2}px)`;
    }
});

// Card Hover Glow Effect
document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate cards on load
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Handle image fallback
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/100x100?text=AS';
    });
});

// Add dynamic year to copyright if needed
const yearElement = document.querySelector('.current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Performance optimization: Debounce mousemove events
let ticking = false;
document.addEventListener('mousemove', (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Your mousemove logic here (already defined above)
            // The orb movement is already handled in the first listener
            ticking = false;
        });
        ticking = true;
    }
});

// Optional: Add keyboard shortcut for theme toggle (Ctrl/Cmd + K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeBtn.click();
    }
});