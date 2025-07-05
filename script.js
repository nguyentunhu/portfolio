// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Initial fade in for header
setTimeout(() => {
    document.querySelector('.header').classList.add('visible');
}, 100);

// Add typing effect to the main title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment the lines below if you want a typing effect on your name
// document.addEventListener('DOMContentLoaded', function() {
//     const nameElement = document.querySelector('.header h1');
//     const originalText = nameElement.textContent;
//     setTimeout(() => {
//         typeWriter(nameElement, originalText, 150);
//     }, 500);
// });

// REMOVED: Problematic parallax effect that was causing scroll instability
// The body transform was causing layout thrashing and performance issues

// Add smooth hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click to copy functionality for contact information
document.querySelectorAll('.contact-card a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('mailto:')) {
            e.preventDefault();
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Show a temporary success message
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        }
    });
});

// Optional: Add a subtle parallax effect that won't cause instability
// This version only affects specific elements and is throttled for performance
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Only apply subtle parallax to the header background
    const header = document.querySelector('.header');
    if (header) {
        // Much smaller transform value and only on background elements
        header.style.backgroundPositionY = `${scrolled * 0.1}px`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});