
const products = [
    {
        name: "Rolex Oyster",
        category: "Luxury",
        price: 450000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        description: "Premium luxury watch with elegant design."
    },
    {
        name: "Michael Kors",
        category: "Luxury",
        price: 85000,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
        description: "Modern and stylish luxury timepiece."
    },
    {
        name: "Vintage Heritage",
        category: "Vintage",
        price: 55000,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
        description: "Beautiful vintage inspired watch."
    },
    {
        name: "Citizen Eco-Drive",
        category: "Classic",
        price: 95000,
        image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600",
        description: "Light-powered classic watch."
    },
    {
        name: "Smart Watch Pro",
        category: "Smart",
        price: 35000,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600",
        description: "Modern smartwatch with smart features."
    },
    {
        name: "Bulova Precision",
        category: "Luxury",
        price: 125000,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
        description: "Elegant precision-inspired watch."
    },
    {
        name: "Classic Leather",
        category: "Classic",
        price: 42000,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
        description: "Classic leather strap watch."
    },
    {
        name: "Retro Collection",
        category: "Vintage",
        price: 60000,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
        description: "Retro style timepiece."
    }
];

// DISPLAY PRODUCTS

function displayProducts(list) {
    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    list.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p class="product-price">PKR ${product.price.toLocaleString()}</p>
            <button class="btn" onclick="showDetails('${product.name}')">
                View Details
            </button>
        `;

        grid.appendChild(card);
    });
}

// FILTER PRODUCTS

function filterProducts(category, button) {
    document.querySelectorAll(".categories button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    if (category === "All") {
        displayProducts(products);
    } else {
        const filtered = products.filter(product =>
            product.category === category
        );

        displayProducts(filtered);
    }
}

// PRODUCT POPUP

function showDetails(name) {
    const product = products.find(p => p.name === name);

    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalName").innerText = product.name;
    document.getElementById("modalCategory").innerText = product.category;
    document.getElementById("modalDescription").innerText = product.description;
    document.getElementById("modalPrice").innerText =
        "PKR " + product.price.toLocaleString();

    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

// MOBILE MENU

function toggleMenu() {
    document.getElementById("navbar").classList.toggle("show");
}

// PRICE LIST

function displayPrices() {
    const table = document.getElementById("priceTable");

    products.forEach(product => {
        table.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>PKR ${product.price.toLocaleString()}</td>
            </tr>
        `;
    });
}

// VISITOR COUNTER

let visitors = Number(localStorage.getItem("visitors") || 0);

visitors++;

localStorage.setItem("visitors", visitors);

document.getElementById("visitors").innerText = visitors;

// DATE AND TIME

function updateTicker() {
    const now = new Date();

    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const location =
        document.getElementById("ticker").dataset.location ||
        "Location unavailable";

    document.getElementById("ticker").innerText =
        `ALBERTO WATCH COMPANY | Date: ${date} | Time: ${time} | Location: ${location} | Welcome!`;
}

// GEOLOCATION

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const latitude = position.coords.latitude.toFixed(2);
            const longitude = position.coords.longitude.toFixed(2);

            document.getElementById("ticker").dataset.location =
                `Lat ${latitude}, Long ${longitude}`;

            updateTicker();
        },
        function() {
            document.getElementById("ticker").dataset.location =
                "Location permission denied";

            updateTicker();
        }
    );
}

// CONTACT FORM

function sendMessage(event) {
    event.preventDefault();

    alert("Thank you for contacting Alberto Watch Company!");

    event.target.reset();
}

// INITIALIZE WEBSITE

displayProducts(products);
displayPrices();
updateTicker();

setInterval(updateTicker, 1000);

