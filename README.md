# Product Management API

## Project Overview

This is a full-stack Product Management application with authentication and product CRUD operations. The backend is built using Node.js, Express, and MongoDB, while the frontend is developed using HTML, CSS, Bootstrap, and Vanilla JavaScript. The backend also serves static files, and both frontend and backend run on **port 3000**.

## Project Structure

```
product-management-api/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   ├── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   ├── validators/
│   │   │   ├── productValidator.js
│   │   ├── app.js
│   │   ├── server.js
│   ├── package.json
│   ├── .env
│
├── frontend/
│   ├── components/
│   │   ├── navbar.html
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── navbar.js
│   │   ├── products.js
│   ├── index.html
│   ├── product_create.html
│   ├── product_edit.html
│   ├── product_list.html
│   ├── product_view.html
```

## Backend Setup

### Install Dependencies

Navigate to the `backend` folder and install dependencies:

```sh
cd backend
npm install
```

### Environment Variables

Ensure the `.env` file is inside the `backend/` folder and contains:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=your_jwt_expiration_time
PORT=3000
```

### Start the Backend Server

```sh
cd backend
node src/server.js
```

## Frontend Setup

The backend serves static files, so the frontend can be accessed directly at:

```
http://localhost:3000/
```

## API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Register a new user |
| POST   | /auth/login    | Authenticate a user |

### Product Routes (`/products`)

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| GET    | /products      | Get all products             |
| GET    | /products/:id  | Get a single product         |
| POST   | /products      | Create a product (protected) |
| PUT    | /products/:id  | Update a product (protected) |
| DELETE | /products/:id  | Delete a product (protected) |

## Authentication & Authorization

- Users must be authenticated to create, update, and delete products.
- JWT tokens are used for authentication, and they must be included in the request headers for protected routes.

## Navbar Behavior

The `navbar.html` file is dynamically loaded in all frontend pages using `js/navbar.js`.

- If the user is **not logged in**, the navbar shows a **Login** button.
- If the user is **logged in**, the navbar shows a **Logout** button and access to protected pages (e.g., product creation).

## Notes

- The backend runs on **port 3000** and serves static files.
- Ensure MongoDB is running before starting the backend server.
- API calls are handled via `axios` in `js/api.js`.
- Authentication logic is in `js/auth.js`.
- Product management logic is in `js/products.js`.

## Future Improvements

- Add UI enhancements and better form validation.
- Implement user roles (admin, user) for better access control.
- Improve error handling and user feedback messages.
