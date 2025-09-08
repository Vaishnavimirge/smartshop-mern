import React from "react";

export default function ItemCard({ item, addToCart }) {
  return (
    <div className="item-card" style={{ border: "1px solid #ddd", padding: "1rem", margin: "1rem" }}>
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Category: {item.category}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
}
