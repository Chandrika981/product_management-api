document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
  
    // Handle login form submission
    if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); 
  
        const userData = {
          userName: document.getElementById("loginUsername").value,
          password: document.getElementById("loginPassword").value,
        };
  
        try {
          const response = await api.post("/auth/login", userData);
          localStorage.setItem("token", response.data.token);
          alert("Login successful!");
          window.location.href = "product_list.html"; // Redirect after login
        } catch (error) {
          alert("Login failed! Please check your credentials.");
          console.error(
            "Login error:",
            error.response ? error.response.data : error
          );
        }
      });
    }
  
    // Handle register form submission
    if (registerForm) {
      registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const userData = {
          userName: document.getElementById("registerUsername").value,
          password: document.getElementById("registerPassword").value,
        };
  
        try {
          await api.post("/auth/register", userData);
          alert("Registration successful! Please log in.");
          window.location.href = "index.html"; // Redirect to login after registration
        } catch (error) {
          alert("Registration failed! User may already exist.");
          console.error(
            "Registration error:",
            error.response ? error.response.data : error
          );
        }
      });
    }
  });
  