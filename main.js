// Initialize EmailJS
(function(){
    emailjs.init("7KQuW5X1_C_EpK51l"); // Your Public API Key
})();

// Select form and button
const btn = document.getElementById('button');
const contactSection = document.querySelector('.contact-section');
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submit

    btn.textContent = 'Sending...'; // show sending status

    const serviceID = 'service_autumnpicks';
    const templateID = 'template_autumnpicks';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // Hide the entire contact section
            contactSection.style.display = 'none';

            // Create thank you wrapper to center content
            const thankYouWrapper = document.createElement('div');
            thankYouWrapper.className = 'thank-you-wrapper';
            thankYouWrapper.innerHTML = `
                <div class="thank-you-message">
                    <h2>Thank you!</h2>
                    <p>We’ve received your message and will get back to you shortly.</p>
                    <button id="return-shop" class="affiliate-btn">Return to Shop</button>
                </div>
            `;

            // Append wrapper to main
            document.querySelector('main').appendChild(thankYouWrapper);

            // Redirect button
            document.getElementById('return-shop').addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        })
        .catch((err) => {
            btn.textContent = 'Send';
            console.error('EmailJS error:', err);
            alert('Oops! Something went wrong. Please try again.');
        });
});
