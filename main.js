// Smooth scrolling
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
        
        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.querySelector('.scroll-progress').style.width = scrolled + '%';
        });
        
        // Navigation background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
        
        // Animate product cards on scroll
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
        
        // Product redirect function
        function redirectToStore(product) {
            // In a real implementation, these would be your affiliate links
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
            
            // For demo purposes, show an alert
            alert(`Redirecting to ${product} store page!\n\nIn a real site, this would open:\n${affiliateLinks[product]}`);
            
            // In production, uncomment this line:
            // window.open(affiliateLinks[product], '_blank');
        }
        
        // Contact form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });