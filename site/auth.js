// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const userIcon = document.getElementById('user-icon');

    if (isLoggedIn) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        userIcon.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        userIcon.style.display = 'none';
    }
});