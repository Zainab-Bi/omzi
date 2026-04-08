// --- Products array ---
let products = [
    {id:1, name:"Running Shoes", price:999, oldPrice:1499, image:"images/shoes/shoes.jpg"},
    {id:2, name:"Smart Watch", price:799, oldPrice:1299, image:"images/watches/watch.jpg"},
    {id:3, name:"Hand Bag", price:499, oldPrice:999, image:"images/bags/bag.jpg"},
    {id:4, name:"Wireless Headphones", price:1199, oldPrice:1999, image:"images/electronics/wirelessheadphones.jpg"},
    {id:5, name:"Smartphone", price:8999, oldPrice:10999, image:"images/electronics/phones.jpg"},
    {id:6, name:"T-Shirt", price:699, oldPrice:999, image:"images/t_shirt/tshirt.jpg"},
    {id:7, name:"Beauty Product", price:299, oldPrice:499, image:"images/beauty/beauty.jpg"},
    {id:8, name:"Accessories", price:199, oldPrice:399, image:"images/accessories/accessory.jpg"}
];

// --- Load cart from localStorage ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- Display products on homepage ---
function displayProducts(list){
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    list.forEach(p => {
        const discount = Math.round(((p.oldPrice - p.price)/p.oldPrice)*100);
        container.innerHTML += `
            <div class="card">
                <img src="${p.image}" alt="${p.name}" onerror="this.src='images/placeholder.jpg'">
                <h3>${p.name}</h3>
                <p>
                    <span class="price">₹${p.price}</span>
                    <span class="old-price">₹${p.oldPrice}</span>
                    <span class="discount">(${discount}% off)</span>
                </p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
}

// --- Add product to cart ---
function addToCart(id){
    const product = products.find(p => p.id === id); // find product object
    const itemIndex = cart.findIndex(i => i.id === id);

    if(itemIndex >= 0){
        cart[itemIndex].qty += 1; // increase quantity if already in cart
    } else {
        cart.push({id: id, qty: 1}); // add new item
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    alert(`"${product.name}" has been added to your cart! 🛒`); // ✅ correct popup
}

// --- Update cart count in nav ---
function updateCartCount(){
    const count = cart.reduce((acc, i) => acc + i.qty, 0);
    document.getElementById("cart-count").innerText = count;
}

// --- Search functionality ---
document.getElementById("search").addEventListener("input", function(){
    const value = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
});

// --- Initial display ---
displayProducts(products);
updateCartCount();