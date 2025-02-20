document.addEventListener("DOMContentLoaded", function () {
    const productDetailsContainer = document.getElementById("product-details");
    const updateFormContainer = document.getElementById("update-form-container");
    const updateForm = document.getElementById("update-product-form");
    const cancelUpdateButton = document.getElementById("cancel-update");

    // Get product ID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Fetch product details
    fetch(`http://localhost:8080/api/getproducts/${productId}`)
        .then(response => response.json())
        .then(product => {
            productDetailsContainer.innerHTML = `
                <h2>${product.name}</h2>
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Description:</strong> ${product.desc}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
                <p><strong>Available:</strong> ${product.available ? "Yes" : "No"}</p>
                <button id="update-btn">Update Product</button>
                <button id="delete-btn">Delete Product</button>
            `;

            // Handle Delete Product
            document.getElementById("delete-btn").addEventListener("click", function () {
                if (confirm("Are you sure you want to delete this product?")) {
                    fetch(`http://localhost:8080/api/getproducts/${productId}`, {
                        method: "DELETE",
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Product deleted successfully!");
                            window.location.href = "index.html"; // Redirect to home
                        } else {
                            alert("Failed to delete product.");
                        }
                    })
                    .catch(error => console.error("Error:", error));
                }
            });

            // Handle Update Button Click (Open Form)
            document.getElementById("update-btn").addEventListener("click", function () {
                updateFormContainer.classList.remove("hidden");
                document.getElementById("update-name").value = product.name;
                document.getElementById("update-brand").value = product.brand;
                document.getElementById("update-category").value = product.category;
                document.getElementById("update-description").value = product.desc;
                document.getElementById("update-price").value = product.price;
                document.getElementById("update-quantity").value = product.quantity;
                document.getElementById("update-available").value = product.available;
            });
        })
        .catch(error => console.error("Error fetching product details:", error));

    // Handle Update Product Submission
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedProduct = {
            name: document.getElementById("update-name").value,
            brand: document.getElementById("update-brand").value,
            category: document.getElementById("update-category").value,
            desc: document.getElementById("update-description").value,
            price: parseFloat(document.getElementById("update-price").value),
            quantity: parseInt(document.getElementById("update-quantity").value),
            available: document.getElementById("update-available").value === "true",
        };

        fetch(`http://localhost:8080/api/getproducts/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => response.json())
        .then(data => {
            alert("Product updated successfully!");
            updateFormContainer.classList.add("hidden"); // Hide form
            location.reload(); // Reload page to reflect updates
        })
        .catch(error => console.error("Error updating product:", error));
    });

    // Handle Cancel Update
    cancelUpdateButton.addEventListener("click", function () {
        updateFormContainer.classList.add("hidden");
    });
});
