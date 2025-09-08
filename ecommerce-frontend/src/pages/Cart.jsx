import React from "react";
import { useApp } from "../context";

export default function Cart() {
  const { cart, removeFromCart } = useApp();

  if (cart.length === 0)
    return (
      <h2
        style={{
          padding: "50px",
          textAlign: "center",
          color: "#555",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Your cart is empty
      </h2>
    );

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#4facfe",
          marginBottom: "30px",
        }}
      >
        Your Cart
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {cart.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "15px",
              gap: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>{item.name}</h3>
              <p style={{ margin: 0, fontWeight: "bold", color: "#4facfe" }}>₹{item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              style={{
                padding: "8px 15px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
