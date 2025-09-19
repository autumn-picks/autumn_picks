/* main.js
   - EmailJS initialized with the provided Public Key
   - All original functionality preserved
   - Contact form now sends using EmailJS (service_autumnpicks / template_autumnpicks)
*/

/* Initialize EmailJS (public key provided) */
if (typeof emailjs !== 'undefined') {
    emailjs.init('7KQuW5X1_C_EpK51l');
} else {
    console.warn('EmailJS SDK not loaded. Ensure https://cdn.emailjs.com/dist/email.min.js is included before main.js');
}

/* Smooth scrolling for anchor links */
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

/* Mobile menu toggle (guarded) */
const mobileToggle = document.querySelector('.mobile-menu-toggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.toggle('active');
    });
}

/* Scroll progress indicator */
window.addEventListener('scroll', () => {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const progress = document.querySelector('.scroll-progress');
    if (progress) progress.style.width = scrolled + '%';
});

/* Navigation background on scroll */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* Back to top button visibility */
window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

/* Animate product cards on scroll */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

/* Product filtering */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

/* Wishlist functionality (localStorage) */
let wishlist = JSON.parse(localStorage.getItem('autumnWishlist') || '[]');

function toggleWishlist(button) {
    const card = button.closest('.product-card');
    const productTitle = card.querySelector('.product-title').textContent;

    if (button.classList.contains('favorited')) {
        button.classList.remove('favorited');
        button.textContent = '♡';
        wishlist = wishlist.filter(item => item !== productTitle);
    } else {
        button.classList.add('favorited');
        button.textContent = '♥';
        wishlist.push(productTitle);
    }

    localStorage.setItem('autumnWishlist', JSON.stringify(wishlist));
}

/* Load wishlist on page load */
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productTitle = card.querySelector('.product-title').textContent;
        const wishlistBtn = card.querySelector('.wishlist-btn');

        if (wishlist.includes(productTitle) && wishlistBtn) {
            wishlistBtn.classList.add('favorited');
            wishlistBtn.textContent = '♥';
        }
    });
});

/* Product redirect function (robust trigger handling for button loading states) */
function redirectToStore(product) {
    const affiliateLinks = {
        candles: 'https://example-store.com/candles?ref=yourcode',
        blanket: 'https://example-store.com/blanket?ref=yourcode',
        mugs: 'https://example-store.com/mugs?ref=yourcode',
        wreath: 'https://example-store.com/wreath?ref=yourcode',
        slippers: 'https://example-store.com/slippers?ref=yourcode',
        diffuser: 'https://example-store.com/diffuser?ref=yourcode',
        pillow: 'https://example-store.com/pillow?ref=yourcode',
        lights: 'https://example-store.com/lights?ref=yourcode',
        bathbombs: 'https://example-store.com/bathbombs?ref=yourcode',
        tea: 'https://example-store.com/tea?ref=yourcode',
        lantern: 'https://example-store.com/lantern?ref=yourcode',
        potpourri: 'https://example-store.com/potpourri?ref=yourcode'
    };

    // Use document.activeElement as a reliable trigger (works for clicks)
    const trigger = document.activeElement && (document.activeElement.tagName === 'BUTTON' || document.activeElement.tagName === 'A')
        ? document.activeElement
        : null;

    if (trigger) {
        const original = trigger.innerHTML;
        trigger.innerHTML = '<span class="loading"></span> Loading...';
        trigger.disabled = true;

        setTimeout(() => {
            trigger.innerHTML = original;
            trigger.disabled = false;
            alert(`Redirecting to ${product} store page!\n\nIn a real site, this would open:\n${affiliateLinks[product]}`);
            // window.open(affiliateLinks[product], '_blank');
        }, 1000);
    } else {
        // fallback: show alert only
        setTimeout(() => {
            alert(`Redirecting to ${product} store page!\n\nIn a real site, this would open:\n${affiliateLinks[product]}`);
            // window.open(affiliateLinks[product], '_blank');
        }, 500);
    }
}

/* Newsletter signup (keeps original behavior) */
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('.newsletter-input').value;
    const button = event.target.querySelector('.newsletter-btn');

    button.innerHTML = '<span class="loading"></span>';
    button.disabled = true;

    setTimeout(() => {
        alert(`Thank you for subscribing with ${email}! You'll receive our autumn newsletter soon.`);
        event.target.reset();
        button.innerHTML = 'Subscribe';
        button.disabled = false;
    }, 1500);
}

/* Contact form handling — now sends via EmailJS */
function handleContact(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('.submit-button');

    button.innerHTML = '<span class="loading"></span> Sending...';
    button.disabled = true;

    // sendForm accepts a form element (we pass the form directly)
    emailjs.sendForm('service_autumnpicks', 'template_autumnpicks', form)
    .then(function(response) {
        button.innerHTML = 'Send Message';
        button.disabled = false;
        alert('✅ Message sent! We\'ll get back to you within 24 hours.');
        form.reset();
    }, function(error) {
        console.error('EmailJS error:', error);
        button.innerHTML = 'Send Message';
        button.disabled = false;
        alert('❌ Failed to send message. Please try again later.');
    });
}

/* Scroll to top function */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* Enhanced hero gradient animation (keeps original, but bounded) */
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.min(window.scrollY / window.innerHeight, 1);
        hero.style.background = `linear-gradient(135deg,
            rgba(139,69,19,${1 - scrollPercent*0.3}) ${0 + scrollPercent*20}%,
            rgba(160,82,45,${1 - scrollPercent*0.3}) ${30 + scrollPercent*20}%,
            rgba(205,133,63,${1 - scrollPercent*0.3}) ${60 + scrollPercent*20}%,
            rgba(222,184,135,${1 - scrollPercent*0.3}) ${100 + scrollPercent*20}%)`;
    });
}

/* Falling leaves animation */
function createFallingLeaf() {
    const leaf = document.createElement('div');
    const size = Math.random() * 20 + 15;
    const r = Math.floor(139 + Math.random() * 100);
    const g = Math.floor(69 + Math.random() * 100);
    const b = 19; // keep a warm tone
    leaf.style.cssText = `
        position: fixed;
        top: -50px;
        font-size: ${size}px;
        color: rgba(${r},${g},${b},0.8);
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}vw;
        animation: fall ${Math.random() * 3 + 2}s linear forwards;
    `;
    leaf.textContent = ['🍂', '🍁', '🌰'][Math.floor(Math.random() * 3)];

    document.body.appendChild(leaf);

    setTimeout(() => leaf.remove(), 5000);
}

setInterval(createFallingLeaf, 3000);

/* CSS animation for falling leaves inserted once */
(function insertLeafAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();

/* Interactive hover effects for product cards */
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

/* Keyboard navigation support */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('active');
    }
});
