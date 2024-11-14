document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const clearCartButton = document.getElementById('clear-cart');

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.card-text').textContent.replace('$', ''));

            addToCart(productName, productPrice);
        });
    });

    clearCartButton.addEventListener('click', function() {
        cart = [];
        renderCart();
    });

    function addToCart(name, price) {
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-item">Eliminar</button></td>
            `;
            row.querySelector('.remove-item').addEventListener('click', function() {
                removeFromCart(item.name);
            });
            cartItems.appendChild(row);
            total += item.price * item.quantity;
        });

        if (cart.length === 0) {
            document.getElementById('cart').style.display = 'none';
        } else {
            document.getElementById('cart').style.display = 'block';
        }

        cartCount.textContent = cart.length;
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        renderCart();
    }

    console.log('¡Tienda Shoes Online Lista!');
});

