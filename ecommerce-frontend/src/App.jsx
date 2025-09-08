
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppProvider } from "./context";
import Items from "./pages/Items";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { FaShoppingCart, FaBoxOpen, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./style.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/items" className="nav-link">
              <FaBoxOpen /> Items
            </Link>
            <Link to="/cart" className="nav-link">
              <FaShoppingCart /> Cart
            </Link>
          </div>

          <div className="nav-right">
            <Link to="/login" className="nav-link">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/signup" className="nav-link">
              <FaUserPlus /> Signup
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Items />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
