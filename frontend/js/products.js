// Fetch all products and display them
async function fetchProducts() {
    try {
      const response = await api.get("/products");
      const productList = document.getElementById("productList");
  
      if (!productList) {
        console.error("Error: productList element not found.");
        return;
      }
  
      productList.innerHTML = ""; // Clear previous list
  
      response.data.forEach((product) => {
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
                  <span>${product.productName} - ${product.category}</span>
                  <div>
                      <button class="btn btn-info btn-sm" onclick="viewProduct('${product._id}')">View</button>
                      <button class="btn btn-warning btn-sm protected-link" onclick="editProduct('${product._id}')">Edit</button>
                      <button class="btn btn-danger btn-sm protected-link" onclick="deleteProduct('${product._id}')">Delete</button>
                  </div>
              `;
  
        productList.appendChild(li);
      });
  
      // Hide edit & delete buttons for unauthorized users
      updateProtectedLinks();
    } catch (error) {
      console.error("Error fetching products:", error);
      document.getElementById("productList").innerHTML =
        "<li class='list-group-item text-danger'>Failed to load products.</li>";
    }
  }
  
  // Show or hide protected links (Edit/Delete) based on authentication
  function updateProtectedLinks() {
    const token = localStorage.getItem("token");
  
    if (!token) {
      document.querySelectorAll(".protected-link").forEach((btn) => {
        btn.style.display = "none"; // Hide Edit & Delete buttons for unauthorized users
      });
    }
  }
  
  // View a product (redirects to product_view.html?id=PRODUCT_ID)
  function viewProduct(productId) {
    window.location.href = `product_view.html?id=${productId}`;
  }
  
  // Edit a product (redirects to product_edit.html?id=PRODUCT_ID)
  function editProduct(productId) {
    window.location.href = `product_edit.html?id=${productId}`;
  }
  
  // Delete a product (only for authenticated users)
  async function deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete this product?")) return;
  
    try {
      await api.delete(`/products/${productId}`);
      alert("Product deleted successfully.");
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  }
  
  // Load and display product details in product_view.html
  async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
  
    if (!productId) {
      alert("Invalid product ID");
      window.location.href = "product_list.html";
      return;
    }
  
    try {
      const response = await api.get(`/products/${productId}`);
      document.getElementById("viewProductName").textContent =
        response.data.productName;
      document.getElementById("viewCategory").textContent =
        response.data.category;
    } catch (error) {
      alert("Failed to load product details.");
      window.location.href = "product_list.html";
    }
  }
  
  // Load product details into edit form in product_edit.html
  async function loadEditForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
  
    if (!productId) {
      alert("Invalid product ID");
      window.location.href = "product_list.html";
      return;
    }
  
    try {
      const response = await api.get(`/products/${productId}`);
      document.getElementById("productId").value = productId;
      document.getElementById("editProductName").value =
        response.data.productName;
      document.getElementById("editCategory").value = response.data.category;
    } catch (error) {
      alert("Failed to load product details.");
      window.location.href = "product_list.html";
    }
  }
  
  // Handle form submission for updating a product in product_edit.html
  document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editProductForm");
  
    if (editForm) {
      editForm.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const productId = document.getElementById("productId").value;
        const updatedProduct = {
          productName: document.getElementById("editProductName").value,
          category: document.getElementById("editCategory").value,
        };
  
        try {
          await api.put(`/products/${productId}`, updatedProduct);
          alert("Product updated successfully!");
          window.location.href = "product_list.html";
        } catch (error) {
          alert("Failed to update product.");
        }
      });
    }
  });
  
  // Handle form submission for creating a new product in product_create.html
  document.addEventListener("DOMContentLoaded", function () {
    const createForm = document.getElementById("addProductForm");
  
    if (createForm) {
      createForm.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const newProduct = {
          productName: document.getElementById("productName").value,
          category: document.getElementById("category").value,
        };
  
        try {
          await api.post("/products", newProduct);
          alert("Product created successfully!");
          window.location.href = "product_list.html";
        } catch (error) {
          alert("Failed to create product.");
        }
      });
    }
  });
  