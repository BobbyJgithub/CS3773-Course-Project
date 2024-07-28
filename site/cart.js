document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const discountCodeInput = document.getElementById('discount-code');
    const applyDiscountBtn = document.getElementById('apply-discount');

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
        let subtotal = 0;

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
                subtotal += item.price * cartItem.quantity;
            }
        });

        const taxRate = 0.0825; // 8.25% tax rate
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        taxElement.textContent = `Tax: $${tax.toFixed(2)}`;
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    window.removeFromCart = function(itemId) {
        cart = cart.filter(cartItem => cartItem.itemId !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    applyDiscountBtn.onclick = function() {
        const discountCode = discountCodeInput.value;
        applyDiscount(discountCode);
    };

    function applyDiscount(code) {
        // Example discount application logic
        let discount = 0;
        if (code === 'DISCOUNT10') {
            discount = 0.10; // 10% discount
        } else if (code === 'DISCOUNT20') {
            discount = 0.20; // 20% discount
        }

        const subtotal = parseFloat(subtotalElement.textContent.replace('Subtotal: $', ''));
        const taxRate = 0.0825;
        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        const discountedTotal = total * (1 - discount);

        totalElement.textContent = `Total: $${discountedTotal.toFixed(2)}`;
    }

});
