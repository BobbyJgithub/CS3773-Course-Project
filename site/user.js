document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }



    document.getElementById('user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    });

    document.getElementById('forgot-password').addEventListener('click', () => {
        alert('Forgot Password feature is not implemented yet. This is a test alert.');
    });
    
});

// user.js
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = './index.html'; // Redirect to home page
});