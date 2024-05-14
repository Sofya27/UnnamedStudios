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
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartContainer = document.getElementById('cart-items');
    const emptyCartSection = document.querySelector('.empty-cart');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            const productInfo = {
                name: 'Ink Hoodie',
                price: document.querySelector('.price').textContent,
                size: document.querySelector('select[name="Size"]').value,
                quantity: parseInt(document.querySelector('input[name="quantity"]').value, 10)
            };

            let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            cart.push(productInfo);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.html';
        });
    }

    if (cartContainer) {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (cart.length > 0) {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <p>Name: ${item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Size: ${item.size}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeItem(${index})">Remove from Cart</button>
                `;
                cartContainer.appendChild(itemElement);
            });
            emptyCartSection.style.display = 'none';
        } else {
            emptyCartSection.style.display = 'flex';
        }
    }
});

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}




