const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY >0);
})

let menu = document.querySelector('#menu-icon')
let navmenu = document.querySelector('.navmenu')

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navmenu.classList.toggle('open')
}
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

function addToCart(productId, quantity, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[productId]) {
        cart[productId].quantity += quantity;
    } else {
        cart[productId] = { quantity, price };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[productId]) {
        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    Object.keys(cart).forEach(productId => {
        const { quantity, price } = cart[productId];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Product ${productId}</td>
            <td>${quantity}</td>
            <td>$${(price * quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart('${productId}')">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
        total += price * quantity;
    });
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
}

// Example of adding an item (You'll need actual product IDs and prices)
document.getElementById('addToCartButton').addEventListener('click', () => {
    addToCart('1', 1, 10.00); // Product ID, Quantity, Price
});
