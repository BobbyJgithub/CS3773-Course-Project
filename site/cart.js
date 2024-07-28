document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let items = [];

    // Fetch all items
    fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(data => {
            items = data;
            renderCart();
        })
        .catch(error => console.error('Failed to fetch items:', error));

    function renderCart() {
        cartContainer.innerHTML = '';
        cart.forEach(cartItem => {
            const item = items.find(item => item._id === cartItem.itemId);
            if (item) {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Quantity: ${cartItem.quantity}</p>
                        <button onclick="removeFromCart('${item._id}')">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(cartItemElement);
            }
        });
    }

    window.removeFromCart = function(itemId) {
        cart = cart.filter(cartItem => cartItem.itemId !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    updateCartCount();
});
