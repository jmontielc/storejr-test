// Datos de productos de ejemplo
const products = [
    {
        id: 1,
        title: "Camiseta Básica Hombre",
        price: 8.20,
        category: "hombre",
        image: "img/collection/shirts/camiseta1.jpg",
        description: "Camiseta de algodón 100% cómoda y duradera",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blanco", "Negro", "Azul", "Gris"]
    },
    {
        id: 2,
        title: "Vestido Casual Mujer",
        price: 17.00,
        category: "mujer",
        image: "img/collection/dress/vestido.jpg",
        description: "Vestido elegante perfecto para el día a día",
        sizes: ["S", "M", "L"],
        colors: ["Rojo", "Negro", "Azul", "Rosa"]
    },
    {
        id: 3,
        title: "Pantalón Vaquero",
        price: 15.00,
        category: "hombre",
        image: "images/pantalonvaquero.jpg",
        description: "Pantalón vaquero clásico con corte moderno",
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Azul", "Negro"]
    },
    {
        id: 4,
        title: "Chaqueta Deportiva",
        price: 25.97,
        category: "hombre",
        image: "images/chaqueta.jpg",
        description: "Chaqueta deportiva ideal para actividades al aire libre",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Azul", "Verde"]
    },
    {
        id: 5,
        title: "Blusa Elegante",
        price: 11.00,
        category: "mujer",
        image: "images/blusa.jpg",
        description: "Blusa elegante para ocasiones especiales",
        sizes: ["S", "M", "L"],
        colors: ["Blanco", "Negro", "Rosa", "Azul"]
    },
    {
        id: 6,
        title: "Falda Midi",
        price: 13.00,
        category: "mujer",
        image: "images/falda.jpg",
        description: "Falda midi versátil para cualquier ocasión",
        sizes: ["S", "M", "L"],
        colors: ["Negro", "Azul", "Verde", "Rosa"]
    },
    {
        id: 7,
        title: "Camiseta Infantil",
        price: 6.99,
        category: "niños",
        image: "images/camiseta2.jpg",
        description: "Camiseta cómoda para niños con diseño divertido",
        sizes: ["4", "6", "8", "10", "12"],
        colors: ["Rojo", "Azul", "Amarillo", "Verde"]
    },
    {
        id: 8,
        title: "Pantalón Infantil",
        price: 12.60,
        category: "niños",
        image: "images/pantalon1.jpg",
        description: "Pantalón resistente para el juego diario",
        sizes: ["4", "6", "8", "10", "12"],
        colors: ["Azul", "Negro", "Verde"]
    },
    {
        id: 9,
        title: "Reloj Elegante",
        price: 109.27,
        category: "accesorios",
        image: "images/reloj.jpg",
        description: "Reloj elegante con correa de cuero genuino",
        colors: ["Negro", "Marrón", "Azul"]
    },
    {
        id: 10,
        title: "Bolso de Mano",
        price: 24.99,
        category: "accesorios",
        image: "images/bolsa.jpg",
        description: "Bolso de mano elegante para el día a día",
        colors: ["Negro", "Marrón", "Rojo"]
    },
    {
        id: 11,
        title: "Zapatos Deportivos",
        price: 65.50,
        category: "hombre",
        image: "img/tenis.jpg",
        description: "Zapatos deportivos cómodos para el ejercicio",
        sizes: ["38", "39", "40", "41", "42", "43", "44"],
        colors: ["Blanco", "Negro", "Azul"]
    },
    {
        id: 12,
        title: "Tacones Elegantes",
        price: 49.99,
        category: "mujer",
        image: "images/tacones.jpg",
        description: "Tacones elegantes para ocasiones especiales",
        sizes: ["36", "37", "38", "39", "40"],
        colors: ["Negro", "Rojo", "Nude"]
    }
];

// Estado de la aplicación
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];

// Elementos DOM
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const successModal = document.getElementById('successModal');
const closeSuccess = document.getElementById('closeSuccess');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Carrito
    cartIcon.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', closeCartSidebar);
    closeCart.addEventListener('click', closeCartSidebar);
    
    // Filtros
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', sortProducts);
    
    // Categorías
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryFilter.value = category;
            filterProducts();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Modales
    closeModal.addEventListener('click', closeProductModal);
    closeCheckout.addEventListener('click', closeCheckoutModal);
    closeSuccess.addEventListener('click', closeSuccessModal);
    
    // Formulario de checkout
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === productModal) closeProductModal();
        if (e.target === checkoutModal) closeCheckoutModal();
        if (e.target === successModal) closeSuccessModal();
    });
}

// Renderizar productos
function renderProducts() {
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros para ver más productos.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                    <button class="btn-view" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filtrar productos
function filterProducts() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    
    filteredProducts = products.filter(product => {
        let matchesCategory = !category || product.category === category;
        let matchesPrice = true;
        
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            if (max) {
                matchesPrice = product.price >= min && product.price <= max;
            } else {
                matchesPrice = product.price >= min;
            }
        }
        
        return matchesCategory && matchesPrice;
    });
    
    sortProducts();
}

// Ordenar productos
function sortProducts() {
    const sortBy = sortFilter.value;
    
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // Mantener orden original
            break;
    }
    
    renderProducts();
}

// Agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedSize: product.sizes ? product.sizes[0] : null,
            selectedColor: product.colors ? product.colors[0] : null
        });
    }
    
    updateCartUI();
    showNotification('Producto agregado al carrito', 'success');
}

// Actualizar UI del carrito
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    renderCartItems();
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderizar items del carrito
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos productos para comenzar a comprar.</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${item.image}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                ${item.selectedSize ? `<div class="cart-item-size">Talla: ${item.selectedSize}</div>` : ''}
                ${item.selectedColor ? `<div class="cart-item-color">Color: ${item.selectedColor}</div>` : ''}
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="setQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartUI();
    }
}

// Establecer cantidad específica
function setQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity) || 1);
        updateCartUI();
    }
}

// Remover del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Producto removido del carrito', 'info');
}

// Ver producto
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <div class="product-image-large">${product.image}</div>
            </div>
            <div class="product-detail-info">
                <h2>${product.title}</h2>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                
                ${product.sizes ? `
                    <div class="product-options">
                        <label>Talla:</label>
                        <select id="productSize">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                ` : ''}
                
                ${product.colors ? `
                    <div class="product-options">
                        <label>Color:</label>
                        <select id="productColor">
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                    </div>
                ` : ''}
                
                <div class="product-detail-actions">
                    <button class="btn btn-primary btn-add-cart-detail" onclick="addToCartWithOptions(${product.id})">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
}

// Agregar al carrito con opciones
function addToCartWithOptions(productId) {
    const product = products.find(p => p.id === productId);
    const selectedSize = document.getElementById('productSize')?.value;
    const selectedColor = document.getElementById('productColor')?.value;
    
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedSize: selectedSize || null,
            selectedColor: selectedColor || null
        });
    }
    
    updateCartUI();
    closeProductModal();
    showNotification('Producto agregado al carrito', 'success');
}

// Toggle carrito
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Cerrar carrito
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Cerrar modal de producto
function closeProductModal() {
    productModal.classList.remove('active');
}

// Cerrar modal de checkout
function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
}

// Cerrar modal de éxito
function closeSuccessModal() {
    successModal.classList.remove('active');
}

// Proceder al checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }
    
    // Renderizar resumen del pedido
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    
    orderSummary.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.title} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotal.textContent = total.toFixed(2);
    
    closeCartSidebar();
    checkoutModal.classList.add('active');
}

// Manejar checkout
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const orderData = {
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerAddress: document.getElementById('customerAddress').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderDate: new Date().toISOString()
    };
    
    // Simular procesamiento del pedido
    setTimeout(() => {
        // Guardar pedido en localStorage (en una app real, esto iría al servidor)
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Limpiar carrito
        cart = [];
        updateCartUI();
        
        // Mostrar modal de éxito
        closeCheckoutModal();
        successModal.classList.add('active');
        
        // Enviar email simulado (en una app real, esto se haría desde el servidor)
        console.log('Email enviado a:', orderData.customerEmail);
        console.log('Pedido procesado:', orderData);
        
    }, 2000);
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1005;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event listener para el botón de checkout
document.getElementById('checkoutBtn').addEventListener('click', proceedToCheckout);

// Smooth scroll para enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cargar más productos (simulación de paginación)
function loadMoreProducts() {
    // En una aplicación real, esto cargaría más productos desde el servidor
    showNotification('Todos los productos están cargados', 'info');
}

// Buscar productos (funcionalidad adicional)
function searchProducts(query) {
    if (!query.trim()) {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
    }
    renderProducts();
}

// Agregar funcionalidad de búsqueda
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar productos...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 10px 15px;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 1rem;
        width: 100%;
        max-width: 400px;
        margin: 0 auto 2rem;
        display: block;
    `;
    
    searchInput.addEventListener('input', function() {
        searchProducts(this.value);
    });
    
    const productsSection = document.querySelector('.products .container');
    const productsTitle = productsSection.querySelector('h2');
    productsSection.insertBefore(searchInput, productsTitle.nextSibling);
}

// Inicializar funcionalidad de búsqueda
addSearchFunctionality();

// Funcionalidad de favoritos (bonus)
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Producto removido de favoritos', 'info');
    } else {
        favorites.push(productId);
        showNotification('Producto agregado a favoritos', 'success');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(productId) {
    return favorites.includes(productId);
}

// Mejorar la experiencia de usuario con animaciones
function addLoadingState() {
    const loadingHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
    productsGrid.innerHTML = loadingHTML;
}

// Simular carga de productos
function simulateProductLoading() {
    addLoadingState();
    setTimeout(() => {
        renderProducts();
    }, 1000);
}

// Inicializar con carga simulada
setTimeout(() => {
    simulateProductLoading();
}, 500);
