// Login Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and update navbar
    checkLoginStatus();
    
    // Check if we're on the login page
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Real-time validation
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
            emailInput.addEventListener('input', clearEmailError);
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('blur', validatePassword);
            passwordInput.addEventListener('input', clearPasswordError);
        }
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }
    
    // Loyalty program button
    const loyaltyBtn = document.querySelector('.loyalty-btn');
    if (loyaltyBtn) {
        loyaltyBtn.addEventListener('click', handleLoyaltySignup);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Email Validation
function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.value) {
        emailError.textContent = 'Email is required';
        email.style.borderColor = '#e74c3c';
        return false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        email.style.borderColor = '#e74c3c';
        return false;
    } else {
        emailError.textContent = '';
        email.style.borderColor = '#2ecc71';
        return true;
    }
}

function clearEmailError() {
    const emailError = document.getElementById('emailError');
    const email = document.getElementById('email');
    if (email.value && email.style.borderColor === 'rgb(46, 204, 113)') {
        emailError.textContent = '';
    }
}

// Password Validation
function validatePassword() {
    const password = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        password.style.borderColor = '#e74c3c';
        return false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        password.style.borderColor = '#e74c3c';
        return false;
    } else {
        passwordError.textContent = '';
        password.style.borderColor = '#2ecc71';
        return true;
    }
}

function clearPasswordError() {
    const passwordError = document.getElementById('passwordError');
    const password = document.getElementById('password');
    if (password.value && password.style.borderColor === 'rgb(46, 204, 113)') {
        passwordError.textContent = '';
    }
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.querySelector('input[name="remember"]').checked;
    const loginMessage = document.getElementById('loginMessage');
    
    // Validate fields
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    
    if (!emailValid || !passwordValid) {
        loginMessage.textContent = 'Please fix the errors above';
        loginMessage.className = 'error';
        return;
    }
    
    // Simulate login (in real app, would send to backend)
    loginMessage.textContent = 'Logging in...';
    loginMessage.className = '';
    
    setTimeout(() => {
        // Mock authentication - you can replace this with actual backend call
        const mockUsers = [
            { email: 'user@example.com', password: 'password123' },
            { email: 'admin@brewbrew.com', password: 'admin123' },
            { email: 'test@test.com', password: 'test123' }
        ];
        
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            loginMessage.textContent = 'Login successful! Redirecting...';
            loginMessage.className = 'success';
            
            // Store current user session
            localStorage.setItem('currentUser', JSON.stringify({ email }));
            
            // Store login info if remember me is checked
            if (remember) {
                localStorage.setItem('coffeecafe_user', JSON.stringify({ email, remember: true }));
            } else {
                localStorage.removeItem('coffeecafe_user');
            }
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            loginMessage.textContent = 'Invalid email or password';
            loginMessage.className = 'error';
        }
    }, 1000);
}

// Handle Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    const name = e.target.elements[0].value;
    const email = e.target.elements[1].value;
    const message = e.target.elements[2].value;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate sending message
    console.log('Message sent:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    e.target.reset();
}

// Load saved user on page load
window.addEventListener('load', function() {
    const savedUser = localStorage.getItem('coffeecafe_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = user.email;
        }
    }
});

// Hamburger Menu for Mobile (optional enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Add scroll event listener for navbar effects
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else if (navbar) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Handle Newsletter Signup
function handleNewsletterSignup(e) {
    e.preventDefault();
    
    const email = e.target.elements[0].value;
    const newsletterMessage = document.getElementById('newsletterMessage');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        newsletterMessage.textContent = 'Please enter a valid email';
        newsletterMessage.className = 'error';
        return;
    }
    
    // Store subscription
    let subscribers = localStorage.getItem('newsletter_subscribers');
    subscribers = subscribers ? JSON.parse(subscribers) : [];
    
    if (subscribers.includes(email)) {
        newsletterMessage.textContent = 'Already subscribed!';
        newsletterMessage.className = 'error';
        return;
    }
    
    subscribers.push(email);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    
    newsletterMessage.textContent = 'Successfully subscribed! Check your email.';
    newsletterMessage.className = 'success';
    
    // Reset form
    e.target.reset();
    
    setTimeout(() => {
        newsletterMessage.textContent = '';
    }, 4000);
}

// Handle Loyalty Program Signup
function handleLoyaltySignup() {
    const email = prompt('Enter your email to join our loyalty program:');
    
    if (email === null) return;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Store loyalty member
    let members = localStorage.getItem('loyalty_members');
    members = members ? JSON.parse(members) : [];
    
    if (members.find(m => m.email === email)) {
        alert('You are already a loyalty member! Visit us to collect your card.');
        return;
    }
    
    const member = {
        email: email,
        points: 0,
        joined: new Date().toLocaleDateString()
    };
    
    members.push(member);
    localStorage.setItem('loyalty_members', JSON.stringify(members));
    
    alert('Welcome to our Loyalty Program! ☕\n\nYour membership has been created.\nVisit us to get your loyalty card and start earning rewards!');
}

// Check if user is logged in and update navbar accordingly
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const loginLink = document.getElementById('loginLink');
    const userProfile = document.getElementById('userProfile');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (loginLink) {
            loginLink.style.display = 'none';
        }
        if (userProfile) {
            userProfile.style.display = 'flex';
            document.getElementById('userName').textContent = '👤 ' + user.email.split('@')[0];
        }
    } else {
        if (loginLink) {
            loginLink.style.display = 'block';
        }
        if (userProfile) {
            userProfile.style.display = 'none';
        }
    }
}

// Handle logout functionality
function handleLogout() {
    // Confirm logout
    if (confirm('Are you sure you want to logout?')) {
        // Clear user session
        localStorage.removeItem('currentUser');
        localStorage.removeItem('coffeecafe_user');
        
        // Update navbar
        checkLoginStatus();
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
    return false;
}
