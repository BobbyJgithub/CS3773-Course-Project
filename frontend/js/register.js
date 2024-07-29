document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
  
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
        window.location.href = 'login.html';
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Failed to register:', error);
    }
  });
  