# 📚 Book City API

A modern, modular, and scalable NestJS API for managing users, authentication, products, and favorites.  
More features coming soon...

---

## 🚀 Features

### ✅ Auth

- **Login** — `POST /auth/login`
- **Register** — `POST /auth/register`
- **Forget Password** — `POST /auth/forget-password`
- **Reset Password** — `POST /auth/reset-password`
- **Refresh Token** — `POST /auth/refresh-token`

---

### 📦 Products

- **Get all products** — `GET /products`
- **Get product by ID** — `GET /products/:id`
- **Create product** — `POST /products`
- **Update product** — `PUT /products/:id`
- **Delete product** — `DELETE /products/:id`
- **Upload Photos** - `PUT /products/upload-photos/:id`

---

### ❤️ Favorites

- **Get all favorites (by user)** — `GET /favorites`
- **Get favorite by ID** — `GET /favorites/:id`
- **Add to favorites** — `POST /favorites`
- **Delete favorite** — `DELETE /favorites/:id`

---

### 👤 Users

- **Get all users** — `GET /users`
- **Get user by ID** — `GET /users/:id`
- **Edit profile** — `PUT /users/:id`
- **Change Role** — `PUT /users/change-profile/:id`
- **Upload Profile Picture** - `POST /users/upload-profilePicture`

---

## ⚙️ Technologies

- **NestJS** — main backend framework
- **TypeORM** — ORM for PostgreSQL (or any SQL DB)
- **JWT** — authentication
- **Bcrypt** — password hashing
- **Nodemailer** — email service
- **Multer** - upload picture & file

---

## 🛡️ Security

- Passwords hashed using Bcrypt
- JWT-based access and refresh tokens
- Role-based guards and authorization (optional)
- Validation with DTOs

---

## 📬 Coming Soon

- Others...

---

## 💬 Contact

If you'd like to contribute or have any questions, feel free to create an issue or send a PR!

---

## ⚙️ Installation

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the repository

```bash
git clone git@github.com:KianJanloo/Book-City.git
cd book-city-api
```

✨ Happy coding!
