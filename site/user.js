document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('authToken')) {
        alert('You must be logged in to view this page.');
        window.location.href = 'index.html';
        return;
    }

    fetchUserProfile();
});

async function fetchUserProfile() {
    try {
        const response = await fetch('http://localhost:3000/profile', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('user-email').textContent = data.email;
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Failed to fetch profile');
        }
    } catch (error) {
        console.error('Failed to fetch profile:', error);
        alert('Failed to fetch profile');
    }
}

function logout() {
    localStorage.removeItem('authToken');
    window.location.href = 'index.html';
}
