let productsList = []; 

document.addEventListener('DOMContentLoaded', () => {
    const loadProductsBtn = document.getElementById('loadProductsBtn');
    const sortMinPriceBtn = document.getElementById('sortMinPriceBtn');
    const sortMaxPriceBtn = document.getElementById('sortMaxPriceBtn');
    const productsDisplay = document.getElementById('productsDisplay');
    const regexInput = document.getElementById('regexInput');
    
    const displayProducts = (products) => {
        productsDisplay.innerHTML = ''; // Clear display before showing products
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            `;
            productsDisplay.appendChild(productElement);
        });
    };

    loadProductsBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/v1/products');
            productsList = await response.json(); // Update list
            displayProducts(productsList);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    });

    sortMinPriceBtn.addEventListener('click', () => {
        const sortedProducts = [...productsList].sort((a, b) => a.price - b.price);
        displayProducts(sortedProducts);
    });
    sortMaxPriceBtn.addEventListener('click', () => {
        const sortedProducts = [...productsList].sort((a, b) => b.price - a.price);
        displayProducts(sortedProducts);
    });

    filterBtn.addEventListener('click', async () => {
        const search = searchInput.value.trim();
        const regex = regexInput.value.trim();
        const maxPrice = maxPriceInput.value.trim();
    
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (regex) query.append('regex', regex);
        if (maxPrice) query.append('priceP', maxPrice);
    
        try {
            const response = await fetch(`/api/v1/query?${query.toString()}`);
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
            const filteredProducts = await response.json();
    
            displayProducts(filteredProducts);
        } catch (error) {
            console.error('Failed to apply filters:', error);
            productsDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});