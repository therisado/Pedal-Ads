// PedalADS Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // EmailJS Configuration
    // Initialize EmailJS with your public key
    emailjs.init('qhshU4d_7ezQb0RT8');

    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            const now = new Date();
            
            // Get all form values explicitly
            const nameValue = formData.get('name');
            const emailValue = formData.get('email');
            const phoneValue = formData.get('phone');
            const messageValue = formData.get('message');
            
            // Debug: Log all values
            console.log('Form values:');
            console.log('- Name:', nameValue);
            console.log('- Email:', emailValue);
            console.log('- Phone:', phoneValue);
            console.log('- Phone length:', phoneValue ? phoneValue.length : 'null/undefined');
            console.log('- Message:', messageValue);
            
            const templateParams = {
                title: 'New Website Inquiry',
                name: nameValue || '',
                email: emailValue || '',
                phone: phoneValue || '',
                message: messageValue || '',
                time: now.toLocaleString('en-GB', {
                    timeZone: 'Europe/London',
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }),
                // Also try common alternative naming conventions
                user_name: nameValue || '',
                user_email: emailValue || '',
                user_phone: phoneValue || '',
                user_message: messageValue || ''
            };
            
            console.log('Final template params:', templateParams);
            
            // Send email using EmailJS
            console.log('Attempting to send email with:');
            console.log('Service ID:', 'service_ezq3d4n');
            console.log('Template ID:', 'template_1usaabg');
            console.log('Public Key:', 'qhshU4d_7ezQb0RT8');
            
            emailjs.send(
                'service_ezq3d4n',    // Your Gmail service ID
                'template_1usaabg',   // Your contact form template ID
                templateParams
            ).then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            }).catch(function(error) {
                console.error('FAILED...', error);
                console.error('Error text:', error.text);
                console.error('Error status:', error.status);
                
                // Provide more specific error messages
                let errorMessage = 'Sorry, there was an error sending your message. ';
                
                if (error.text) {
                    if (error.text.includes('Public Key is invalid')) {
                        errorMessage += 'Invalid EmailJS configuration. Please check your public key.';
                    } else if (error.text.includes('Service ID is invalid')) {
                        errorMessage += 'Invalid EmailJS service ID.';
                    } else if (error.text.includes('Template ID is invalid')) {
                        errorMessage += 'Invalid EmailJS template ID.';
                    } else if (error.text.includes('The template parameters are invalid')) {
                        errorMessage += 'Template parameters mismatch. Please check your email template.';
                    } else {
                        errorMessage += error.text;
                    }
                } else {
                    errorMessage += 'Please try again or contact us directly at pedalads.uk@gmail.com';
                }
                
                showMessage(errorMessage, 'error');
            }).finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate stats on scroll
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            const suffix = finalValue.replace(/[\d,]/g, '');
            
            if (!isNaN(numericValue)) {
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    // Format number with commas for thousands
                    const formattedNumber = Math.floor(currentValue).toLocaleString();
                    stat.textContent = formattedNumber + suffix;
                }, 30);
            }
        });
        
        statsAnimated = true;
    }
    
    // Intersection Observer for stats animation
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Add animation to service items on scroll
    const serviceItems = document.querySelectorAll('.service-item');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    serviceItems.forEach(item => {
        serviceObserver.observe(item);
    });

    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksMenu = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinksMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksMenu.classList.toggle('show');
        });
    }

    // WhatsApp integration - make function global
    window.openWhatsApp = function() {
        const message = encodeURIComponent("Hi! I'm interested in your LED advertising services. Can you tell me more?");
        const whatsappUrl = `https://wa.me/447778934806?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    // Add WhatsApp button functionality if it exists
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', openWhatsApp);
    });

    // Show message function
    function showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.notification-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `notification-message notification-${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Add CSS for notifications
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes fadeInUp {
                from { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Carousel functionality
    let slideIndex = 1;
    showSlide(slideIndex);

    // Make carousel functions global
    window.changeSlide = function(n) {
        showSlide(slideIndex += n);
    }

    window.currentSlide = function(n) {
        showSlide(slideIndex = n);
    }

    function showSlide(n) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Hide all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and dot
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].classList.add('active');
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add('active');
        }
    }

    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        if (document.querySelector('.carousel')) {
            changeSlide(1);
        }
    }, 5000);

    // Initialize any additional features
    console.log('PedalADS website loaded successfully!');
});