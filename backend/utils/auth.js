document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const userIcon = document.getElementById('user-icon');
  
    loginLink.style.display = isLoggedIn ? 'none' : 'block';
    signupLink.style.display = isLoggedIn ? 'none' : 'block';
    userIcon.style.display = isLoggedIn ? 'block' : 'none';
  });
  