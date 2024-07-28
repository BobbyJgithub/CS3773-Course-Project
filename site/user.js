document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    document.getElementById('user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, email })
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
});