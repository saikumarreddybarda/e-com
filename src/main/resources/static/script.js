document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    fetch("http://localhost:8080/api/getproducts")
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById("product-list");
            productContainer.innerHTML = "";

            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>By: ${product.brand}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productCard.addEventListener("click", () => {
                    window.location.href = `details.html?id=${product.id}`;
                });
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    const addProductForm = document.getElementById("add-product-form");

    if (addProductForm) {
        addProductForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const productData = {
                name: document.getElementById("product-name").value,
                desc: document.getElementById("product-desc").value,
                brand: document.getElementById("product-brand").value,
                category: document.getElementById("product-category").value,
                price: parseInt(document.getElementById("product-price").value),
                quantity: parseInt(document.getElementById("product-quantity").value),
                available: document.getElementById("product-available").value === "true"
            };

            try {
                const response = await fetch("http://localhost:8080/api/getproducts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(productData)
                });

                if (!response.ok) {
                    throw new Error("Failed to add product");
                }

                alert("Product added successfully!");
                addProductForm.reset();
            } catch (error) {
                console.error("Error:", error);
                alert("Error adding product.");
            }
        });
    }
});

document.getElementById("search-btn").addEventListener("click", function() {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        fetch(`http://localhost:8080/api/getproducts/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(products => displaySearchResults(products))
            .catch(error => console.error("Error fetching search results:", error));
    }
});

function displaySearchResults(products) {
    const searchResultsContainer = document.getElementById("product-list");
    searchResultsContainer.innerHTML = ""; // Clear previous results

    if (products.length === 0) {
        searchResultsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <button onclick="redirectToDetails(${product.id})">View Details</button>
        `;
        searchResultsContainer.appendChild(productCard);
    });
}

function redirectToDetails(productId) {
    window.location.href = `details.html?id=${productId}`;
}

