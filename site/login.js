document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'user.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Failed to login:', error);
    }
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = './index.html'; // Redirect to home page or user page
});