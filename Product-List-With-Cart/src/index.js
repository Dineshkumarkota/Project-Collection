const desserts = [
    { name: "Waffle with Berries", price: 6.50, img: "./assests/waffle.jpg",nickName:"Waffle" },
    { name: "Vanilla Bean Crème Brûlée", price: 7.00, img: "./assests/brulee.jpg",nickName:"Crème Brûlée" },
    { name: "Macaron Mix of Five", price: 8.00, img: "./assests/macaron.jpg",nickName:"Macaron" },
    { name: "Classic Tiramisu", price: 5.50, img: "./assests/tiramisu.jpg",nickName:"Tiramisu" },
    { name: "Pistachio Baklava", price: 4.00, img: "./assests/baklava.jpg",nickName:"baklava" },
    { name: "Lemon Meringue Pie", price: 5.00, img: "./assests/meringue.jpg",nickName:"Pie" },
    { name: "Red Velvet Cake", price: 4.50, img: "./assests/cake.jpg",nickName:"Cake" },
    { name: "Salted Caramel Brownie", price: 3.00, img: "./assests/brownie.jpg",nickName:"Brownie" },
    { name: "Vanilla Panna Cotta", price: 6.50, img: "./assests/panna-cotta.jpg",nickName:"Panna Cotta" }
];
const dessertContainer = document.getElementById('dessert-container');
const cartItems = [];
const cartList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const confirmButton = document.getElementById("confirm-order-btn");
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartDetails = document.getElementById('cart-details');

desserts.forEach(dessert => {
    const cardHtml = `
    <div class="col-md-4 custom-mb-4">
        <div class="card h-100">
            <img src="${dessert.img}" class="card-img-top" alt="${dessert.name}">
            <div class="card-body">
                <span class="light">${dessert.nickName}</span>
                <h5 class="card-title body">${dessert.name}</h5>
                <p class="card-text price">$${dessert.price.toFixed(2)}</p>
                <a href="#" class="btn btn-primary add-to-cart-btn bold"><img class="cartsymbol" src="./assests/icon-add-to-cart.svg"> Add to Cart</a>
            </div>
        </div>
    </div>`;
    dessertContainer.innerHTML += cardHtml;
});

document.querySelectorAll('.add-to-cart-btn').forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(desserts[index]);
        updateButton(button, desserts[index]);
    });
});

function updateButton(button, dessert) {
    const itemCount = countItemInCart(dessert);
    button.innerHTML = `
        <img class="cartsymbol" src="./assests/icon-add-to-cart.svg"> ${itemCount > 0 ? itemCount : 'Add to Cart'}
    `;
}

function countItemInCart(dessert) {
    const item = cartItems.find(item => item.name === dessert.name);
    return item ? item.quantity : 0;
}
function addToCart(dessert) {
    const existingItem = cartItems.find(item => item.name === dessert.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...dessert, quantity: 1 });
    }
    updateCart();
}
function updateCart() {
    if (cartItems.length === 0) {
        emptyCartMessage.classList.remove('d-none');
        cartDetails.classList.add('d-none');
        confirmButton.style.display = 'none';
        cartCount.textContent = '0';
    } else {
        emptyCartMessage.classList.add('d-none');
        cartDetails.classList.remove('d-none');

        cartList.innerHTML = '';
        let total = 0;
        let itemCount = 0;
        cartItems.forEach((item, index) => {
            total += item.price * item.quantity;
            itemCount += item.quantity;
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <img src="${item.img}" class="cart-item-img" alt="${item.name}" style="height: 50px; width: 50px;">
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartList.appendChild(listItem);
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartCount.textContent = itemCount;
        confirmButton.style.display = 'block';
    }
}
function changeQuantity(index, amount) {
    const item = cartItems[index];
    item.quantity += amount;
    if (item.quantity <= 0) {
        cartItems.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    updateCart();
    document.querySelectorAll('.add-to-cart-btn').forEach((button, btnIndex) => {
        if (desserts[btnIndex].name === removedItem.name) {
            updateButton(button, desserts[btnIndex]);
        }
    });
   
}

confirmButton.addEventListener('click', () => {
    if (cartItems.length > 0) {
        const orderConfirmationModal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
        orderConfirmationModal.show();
    }
});
document.getElementById('start-new-order-btn').addEventListener('click', () => {
    cartItems.length = 0; // Clear the cart
    updateCart(); // Update the cart display
    const orderConfirmationModal = bootstrap.Modal.getInstance(document.getElementById('orderConfirmationModal'));
    orderConfirmationModal.hide();
});

