document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const userIcon = document.getElementById('user-icon');
    const logoutBtn = document.getElementById('logout-btn');

    // Check authentication status on page load
    checkAuthStatus();

    // Add event listeners for login and signup modals
    loginBtn.addEventListener('click', () => {
        showModal('login');
    });

    signupBtn.addEventListener('click', () => {
        showModal('signup');
    });

    userIcon.addEventListener('click', () => {
        window.location.href = './user.html';
    });

    logoutBtn.addEventListener('click', () => {
        logout();
    });

    // Define the isLoggedIn function
    function isLoggedIn() {
        return !!localStorage.getItem('authToken');
    }

    // Define the showModal function
    function showModal(type) {
        const authModal = document.getElementById('auth-modal');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        if (type === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
        authModal.style.display = 'block';
    }

    // Define the hideModal function
    function hideModal() {
        const authModal = document.getElementById('auth-modal');
        authModal.style.display = 'none';
    }

    // Define the updateHeaderForLoggedInUser function
    function updateHeaderForLoggedInUser() {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        userIcon.style.display = 'block';
        logoutBtn.style.display = 'block';
    }

    // Define the checkAuthStatus function
    function checkAuthStatus() {
        if (isLoggedIn()) {
            updateHeaderForLoggedInUser();
        }
    }

    // Define the logout function
    function logout() {
        localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken')
        window.location.href = 'index.html'; // redirect to the home page
    }

    // Example login function (modify based on your actual implementation)
    async function login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                alert('Login successful!');
                hideModal();
                updateHeaderForLoggedInUser();
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Failed to login:', error);
            alert('Login failed');
        }
    }

    // Example signup function (modify based on your actual implementation)
    async function signup() {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                alert('Registration successful!');
                hideModal();
                updateHeaderForLoggedInUser();
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            alert('Registration failed');
        }
    }

    // Add event listeners for login and signup buttons in the modal
    document.getElementById('login-submit').addEventListener('click', login);
    document.getElementById('signup-submit').addEventListener('click', signup);

    // Add event listeners to switch between login and signup forms
    document.getElementById('show-signup').addEventListener('click', () => {
        showModal('signup');
    });
    document.getElementById('show-login').addEventListener('click', () => {
        showModal('login');
    });

    // Add event listeners to close the modal
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', hideModal);
    });
});
