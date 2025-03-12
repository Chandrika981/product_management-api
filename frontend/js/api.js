const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
  });
  
  // Attach JWT Token **only for protected routes**
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
  
      if (token && ["post", "put", "delete"].includes(config.method)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Global error handling for API requests
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      return Promise.reject(error);
    }
  );
  