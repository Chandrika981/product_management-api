document.addEventListener("DOMContentLoaded", function () {
    fetch("components/navbar.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("navbar-container").innerHTML = html;
        updateNavbarAuthState(); //to ensure login/logout
      })
      .catch((error) => console.error("Error loading navbar:", error));
  });
  
  // Update Navbar Based on Authentication
  function updateNavbarAuthState() {
    const authLinks = document.getElementById("authLinks");
    const token = localStorage.getItem("token");
  
    if (token) {
      authLinks.innerHTML = `<button class="btn btn-danger" onclick="logout()">Logout</button>`;
      document
        .querySelectorAll(".protected-link")
        .forEach((link) => (link.style.display = "block"));
    } else {
      authLinks.innerHTML = `<a href="index.html" class="btn btn-primary">Login</a>`;
      document
        .querySelectorAll(".protected-link")
        .forEach((link) => (link.style.display = "none"));
    }
  }
  
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
  