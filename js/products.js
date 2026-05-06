/* ===================================================================
   Dynamic Product Catalog - Now fetches from the backend API
=================================================================== */
const API_URL = 'http://localhost:5000/api';

// Fetch all products from the backend
async function fetchProducts(category = 'all') {
    try {
        const url = category === 'all' ? `${API_URL}/products` : `${API_URL}/products?category=${category}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        renderProducts(products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('productsGrid').innerHTML = '<p>Error loading products. Please try again later.</p>';
        return [];
    }
}

// Render products to the grid
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<p>No products found in this category.</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product" data-id="${product.id}">
            <div class="product__visual" style="background:${product.tone || '#2c3245'}">
                ${product.image ? `<img src="${product.image}" alt="${product.name}">` : `<span>${product.name.charAt(0)}</span>`}
            </div>
            <h3 class="product__name">${product.name}</h3>
            <p class="product__sub">${product.sub || ''}</p>
            <div class="product__price-stock">
                <span class="product__price">₹ ${product.price.toLocaleString('en-IN')}</span>
                <span class="product__stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
            </div>
            <button class="product__add" data-id="${product.id}" data-name="${product.name}" data-sub="${product.sub}" data-price="${product.price}" data-cat="${product.category}" data-tone="${product.tone}" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock > 0 ? 'Add to Cart' : 'Notify Me'}
            </button>
        </div>
    `).join('');

    // Re-attach event listeners for "Add to Cart" buttons
    document.querySelectorAll('.product__add').forEach(btn => {
        if (btn.disabled) return;
        btn.addEventListener('click', (e) => {
            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                sub: btn.dataset.sub,
                price: parseInt(btn.dataset.price),
                cat: btn.dataset.cat,
                tone: btn.dataset.tone,
                qty: 1
            };
            if (window.NiyuCart && window.NiyuCart.add) {
                window.NiyuCart.add(product);
            }
        });
    });
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts('all');
    // Set up filters to call fetchProducts with the selected category
    const filterButtons = document.querySelectorAll('#filters .chip');
    if (filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.filter;
                fetchProducts(category);
            });
        });
    }
});

// Export for use in other modules (cart.js, etc.)
window.fetchProducts = fetchProducts;
window.renderProducts = renderProducts;
