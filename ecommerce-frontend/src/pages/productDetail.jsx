import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sampleProducts from "../data/sampleData";
import { useApp } from "../context";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useApp();

  useEffect(() => {
    const prod = sampleProducts.find((p) => p._id === id);
    setProduct(prod);
  }, [id]);

  if (!product)
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          fontSize: "18px",
          color: "#ff4c4c",
        }}
      >
        Product not found.
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ fontSize: "32px", color: "#333" }}>{product.name}</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>
          {product.description}
        </p>
        <h3 style={{ fontSize: "28px", color: "#28a745" }}>₹{product.price}</h3>
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "12px 25px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
