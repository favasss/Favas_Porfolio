document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    // Already done in HTML via lucide.createIcons(), but good practice to ensure it runs
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // How early the element reveals

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Initial check in case elements are already in view
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // 4. Smooth Scrolling for Anchor Links (Optional since CSS scroll-behavior: smooth is active, 
    // but sometimes JS handles edge cases better, though CSS is usually enough).
    // Kept CSS-only for simplicity and performance.

    // 5. Contact Form Submission Logic
    const contactForm = document.getElementById('contactForm');
    const hiddenIframe = document.getElementById('hidden_iframe');
    const successPopup = document.getElementById('successPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    let isSubmitting = false;

    if (contactForm && hiddenIframe && successPopup && closePopupBtn) {
        contactForm.addEventListener('submit', () => {
            isSubmitting = true;
            if (submitBtn) {
                const originalHtml = submitBtn.innerHTML;
                submitBtn.dataset.originalHtml = originalHtml;
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
            }
        });

        hiddenIframe.addEventListener('load', () => {
            if (isSubmitting) {
                // Form was submitted and iframe loaded the response
                successPopup.classList.add('active');
                contactForm.reset();
                isSubmitting = false;
                
                if (submitBtn) {
                    submitBtn.innerHTML = submitBtn.dataset.originalHtml || 'Send Message <i data-lucide="send"></i>';
                    submitBtn.disabled = false;
                    // Re-initialize lucide icon if needed
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            }
        });

        closePopupBtn.addEventListener('click', () => {
            successPopup.classList.remove('active');
        });

        // Close popup if clicking outside
        successPopup.addEventListener('click', (e) => {
            if (e.target === successPopup) {
                successPopup.classList.remove('active');
            }
        });
    }
});
