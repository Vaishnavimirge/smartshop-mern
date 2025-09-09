# 🛒 E-Commerce Website (MERN)

This is a simple **E-Commerce web application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
The app demonstrates core e-commerce features like browsing products, viewing product details, filtering by category and price, managing a cart, and user authentication (login/signup).

---

## 🚀 Features

- **Product Listing** – Displays all items with images, price, and details.
- **Product Detail Page** – View detailed information for each product.
- **Cart Management** – Add products to cart and view selected items.
- **User Authentication** – Signup and login functionality.
- **Filters (Bottom Bar)**:
  - Filter by **Category**
  - Filter by **Price Range**
- **Responsive Design** – Works on desktop and mobile devices.
- **Styled Navigation Bar** – With icons, hover effects, and modern color theme.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Context API, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Icons:** React Icons

---

## 📂 Project Structure


ecommerce-backend/          # Backend (Node.js + Express + MongoDB)
│── server.js               # Entry point, loads middleware & routes
│── .env                    # Environment variables (MONGO_URI, JWT_SECRET, etc.)
│── package.json            # Backend dependencies & scripts
│
├── models/                 # Mongoose schemas
│   ├── User.js             # User schema (auth, cart ref)
│   └── Item.js             # Product schema
│
├── routes/                 # Express routes
│   ├── auth.js             # Signup/Login
│   ├── items.js            # Product CRUD
│   └── cart.js             # Cart operations
│
├── middleware/
│   └── auth.js             # JWT auth middleware
│
└── seed.js                 # Script to populate DB with sample products


ecommerce-frontend/         # Frontend (React + Vite)
│
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   └── ItemCard.jsx    # Product card component
│   │
│   ├── pages/              # App pages
│   │   ├── Login.jsx       # User login
│   │   ├── Signup.jsx      # User signup
│   │   ├── Items.jsx       # Product listing
│   │   ├── Cart.jsx        # User's cart
│   │   └── ProductDetail.jsx # Product details page
│   │
│   ├── App.jsx             # App routes
│   ├── api.js              # Axios instance (API calls)
│   ├── main.jsx            # React entry point
│   └── context.js          # Global state (auth, cart, etc.)
│
├── index.html              # Root HTML template
├── package.json            # Frontend dependencies & scripts
└── vite.config.js          # Vite config

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-mern.git
cd ecommerce-mern
````

### 2️⃣ Install Dependencies

For backend:

```bash
cd backend
npm install
```

For frontend:

```bash
cd ../frontend
npm install
```

### 3️⃣ Run the App

Start backend:

```bash
cd backend
npm start
```

Start frontend (in another terminal):

```bash
cd frontend
npm run dev
```

Frontend runs at **[http://localhost:5173](http://localhost:5173)** (Vite)
Backend runs at **[http://localhost:5000](http://localhost:5000)**

---

## 📸 Screenshots 
![WhatsApp Image 2025-09-09 at 08 56 03_96ca14b9](https://github.com/user-attachments/assets/7e5f8c55-cc90-44b7-9053-624a968c4e5f)
![WhatsApp Image 2025-09-09 at 08 57 22_8b06e168](https://github.com/user-attachments/assets/eac63d72-0435-4994-970f-6941d9f00dae)
![WhatsApp Image 2025-09-09 at 08 58 42_23179c76](https://github.com/user-attachments/assets/ae18268a-0f4a-4ff0-8a75-2b23ab494623)

![WhatsApp Image 2025-09-09 at 08 59 19_be6f0f09](https://github.com/user-attachments/assets/2c6e7aa2-d0d2-4e8d-bfc5-c314cc8bb6ce)
![WhatsApp Image 2025-09-09 at 08 59 37_57328bd9](https://github.com/user-attachments/assets/2010ab82-a2e0-40ed-9c8e-fa0a6a0622e8)



## 🔮 Future Enhancements

* Payment gateway integration
* Order history & tracking
* Admin panel for managing products
* JWT authentication for secure login
* Search functionality with live results

---

## 👩‍💻 Author

Developed by **Vaishnavi Mirge** ✨
Final Year CSE Student | Full-Stack Developer
