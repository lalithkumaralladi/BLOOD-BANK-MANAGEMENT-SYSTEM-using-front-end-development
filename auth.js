// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAAl3Twr4VNZwBZw3lJFGsVqwHI6dnY0w",
    authDomain: "lifeflow-blood-bank.firebaseapp.com",
    projectId: "lifeflow-blood-bank",
    storageBucket: "lifeflow-blood-bank.appspot.com",
    messagingSenderId: "1050913410699",
    appId: "1:1050913410699:web:8a8b4c3d9c7f6e5d4a3b2c1"
};

// Initialize Firebase with error handling
let app, auth;

// Show loading state globally
function showPageLoading(show) {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = show ? 'flex' : 'none';
    }
}

try {
    // Show loading state
    showPageLoading(true);
    
    // Initialize Firebase
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    
    // Set auth persistence
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Show user-friendly error message
    if (typeof showAlert === 'function') {
        showAlert('Failed to initialize authentication. Please refresh the page or try again later.', 'error');
    }
} finally {
    showPageLoading(false);
}

// Handle authentication state changes with debounce
let authStateChangeHandled = false;

const handleAuthStateChanged = (user) => {
    // Prevent multiple redirects
    if (authStateChangeHandled) return;
    authStateChangeHandled = true;
    
    // Show loading state
    showPageLoading(true);
    
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (user) {
            // User is signed in
            console.log('User is signed in:', user.email);
            localStorage.setItem('isLoggedIn', 'true');
            
            // Always redirect to home page if user is logged in
            if (currentPage !== 'index.html') {
                window.location.href = 'index.html';
            }
        } else {
            // User is not signed in but we still redirect to home page
            console.log('User is not signed in, but showing home page');
            localStorage.removeItem('isLoggedIn');
            
            // Redirect to home page regardless of current page
            if (currentPage !== 'index.html') {
                window.location.href = 'index.html';
            }
        }
    } catch (error) {
        console.error('Auth state change error:', error);
    } finally {
        showPageLoading(false);
    }
};

// Set up auth state listener
auth.onAuthStateChanged(handleAuthStateChanged);

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthText = document.getElementById('strengthText');
    const strengthBar = document.querySelector('.strength-bar');
    
    // Check password length
    if (password.length >= 8) strength += 1;
    // Check for lowercase
    if (password.match(/[a-z]+/)) strength += 1;
    // Check for uppercase
    if (password.match(/[A-Z]+/)) strength += 1;
    // Check for numbers
    if (password.match(/[0-9]+/)) strength += 1;
    // Check for special characters
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;
    
    // Update UI
    const strengthPercent = (strength / 5) * 100;
    strengthBar.style.width = `${strengthPercent}%`;
    
    if (strength <= 2) {
        strengthBar.style.backgroundColor = '#ff4757';
        strengthText.textContent = 'Weak';
    } else if (strength <= 4) {
        strengthBar.style.backgroundColor = '#ffa502';
        strengthText.textContent = 'Moderate';
    } else {
        strengthBar.style.backgroundColor = '#2ed573';
        strengthText.textContent = 'Strong';
    }
}

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
    field.setAttribute('type', type);
}

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const remember = loginForm.remember.checked;
        
        try {
            // Sign in with email and password
            // await auth.setPersistence(remember ? 'local' : 'session');
            // await auth.signInWithEmailAndPassword(email, password);
            
            // For demo purposes, redirect after a short delay
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            showAlert(error.message, 'error');
        }
    });
}

// Handle registration form submission
if (registerForm) {
    // Password strength check on input
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            checkPasswordStrength(e.target.value);
        });
    }
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;
        const firstName = registerForm.firstName.value;
        const lastName = registerForm.lastName.value;
        const bloodType = registerForm.bloodType.value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showAlert('Passwords do not match!', 'error');
            return;
        }
        
        try {
            // Create user with email and password
            // const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            // const user = userCredential.user;
            
            // Save additional user data to Firestore
            // await db.collection('users').doc(user.uid).set({
            //     firstName,
            //     lastName,
            //     email,
            //     bloodType,
            //     createdAt: firebase.firestore.FieldValue.serverTimestamp()
            // });
            
            // For demo purposes, redirect after a short delay
            showAlert('Registration successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            
        } catch (error) {
            showAlert(error.message, 'error');
        }
    });
}

// Handle Google Sign In/Up
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async () => {
        try {
            // Sign in with Google
            // const result = await auth.signInWithPopup(provider);
            // const user = result.user;
            
            // Check if it's a new user
            // if (result.additionalUserInfo.isNewUser) {
            //     await db.collection('users').doc(user.uid).set({
            //         displayName: user.displayName,
            //         email: user.email,
            //         photoURL: user.photoURL,
            //         createdAt: firebase.firestore.FieldValue.serverTimestamp()
            //     });
            // }
            
            // For demo purposes, redirect after a short delay
            showAlert('Authentication successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            showAlert(error.message, 'error');
        }
    });
}

// Show alert message
function showAlert(message, type = 'info') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Add event listener for password visibility toggle
if (passwordInput) {
    passwordInput.addEventListener('keyup', () => {
        const strengthText = document.getElementById('strengthText');
        if (strengthText) {
            checkPasswordStrength(passwordInput.value);
        }
    });
}

// Add event listener for confirm password validation
if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('keyup', () => {
        if (passwordInput && confirmPasswordInput.value !== '') {
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity("Passwords don't match");
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        }
    });
}
