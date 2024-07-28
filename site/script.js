document.addEventListener('DOMContentLoaded', async () => {
    let items = [];
 
 
    try {
        const response = await fetch('http://localhost:3000/items');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        items = await response.json();
        renderItems(items);
 
 
        const searchBar = document.getElementById('search-bar');
        const sortSelect = document.getElementById('sort');
        const soldOutCheckbox = document.getElementById('filter-soldout');
 
 
        searchBar.addEventListener('input', () => applyFilters(items));
        sortSelect.addEventListener('change', () => applyFilters(items));
        soldOutCheckbox.addEventListener('change', () => applyFilters(items));
    } catch (error) {
        console.error('Failed to fetch items:', error);
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '<p>Failed to load items</p>';
    }
 });
 
 
 function renderItems(items) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Clear previous items
 
 
    if (items.length === 0) {
        cardsContainer.innerHTML = '<p>No items found</p>';
    } else {
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Availability: ${item.availability ? 'In Stock' : 'Out of Stock'}</p>
            `;
            card.addEventListener('click', () => showPopup(item));
            cardsContainer.appendChild(card);
        });
    }
 }
 
 
 function applyFilters(items) {
    const searchBar = document.getElementById('search-bar');
    const sortSelect = document.getElementById('sort');
    const soldOutCheckbox = document.getElementById('filter-soldout');
 
 
    const searchTerm = searchBar.value.toLowerCase();
    const sortOrder = sortSelect.value;
    const hideSoldOut = soldOutCheckbox.checked;
 
 
    let filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
 
 
    if (hideSoldOut) {
        filteredItems = filteredItems.filter(item => item.availability);
    }
 
 
    filteredItems.sort((a, b) => {
        if (sortOrder === 'low-to-high') {
            return a.price - b.price;
        } else if (sortOrder === 'high-to-low') {
            return b.price - a.price;
        } else {
            return 0;
        }
    });
 
 
    renderItems(filteredItems);
 }
 
 
 function showPopup(item) {
    const modal = document.getElementById('popup-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const addToCartBtn = document.getElementById('add-to-cart');
 
 
    document.getElementById('modal-image').src = item.image;
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-price').textContent = `Price: $${item.price.toFixed(2)}`;
    document.getElementById('modal-availability').textContent = `Availability: ${item.availability ? 'In Stock' : 'Out of Stock'}`;
 
 
    modal.style.display = 'block';
 
 
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
 
 
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
 
 
    addToCartBtn.onclick = function() {
        alert(`Added ${item.name} to cart`);
        modal.style.display = 'none';
    }
 }
 