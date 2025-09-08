import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sampleProducts from "../data/sampleData";

export default function Items() {
  
  const toTitle = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const guessCategory = (item) => {
    const name = `${item.name || ""} ${item.description || ""}`.toLowerCase();
    if (name.match(/\blaptop|notebook|macbook|xps|ideapad|thinkpad\b/)) return "laptop";
    if (name.match(/\bphone|iphone|galaxy|pixel|mobile|oneplus\b/)) return "mobile";
    if (name.match(/\bheadphone|earbud|watch|mouse|keyboard|charger|adapter|case|cover\b/)) return "accessories";
    if (name.match(/\btablet|ipad|tab\b/)) return "tablet";
    return "electronics"; 
  };

  const normalizedItems = useMemo(() => {
    return (sampleProducts || []).map((p) => {
      const raw = (p.category || "").toString().trim();
      const cat = raw ? raw.toLowerCase() : guessCategory(p);
      return { ...p, _cat: cat.toLowerCase() };
    });
  }, []);


  const categories = useMemo(() => {
    const set = new Set(normalizedItems.map((p) => p._cat));
    return ["all", ...Array.from(set)];
  }, [normalizedItems]);

  const { minPrice, maxPrice } = useMemo(() => {
    const prices = normalizedItems.map((p) => Number(p.price) || 0);
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 100000;
    return { minPrice: min, maxPrice: max };
  }, [normalizedItems]);


  const [filters, setFilters] = useState({
    category: "all",
    maxPrice: 0, 
  });
  const [filteredItems, setFilteredItems] = useState(normalizedItems);
  const [headline, setHeadline] = useState("All Items");

  useEffect(() => {
    setFilters((f) => ({ ...f, maxPrice }));
  }, [maxPrice]);

  
  useEffect(() => {
    let result = normalizedItems;

    if (filters.category !== "all") {
      result = result.filter((item) => item._cat === filters.category);
      setHeadline(`${toTitle(filters.category)} Items`);
    } else {
      setHeadline("All Items");
    }

    result = result.filter((item) => Number(item.price) <= Number(filters.maxPrice));

    setFilteredItems(result);
  }, [filters, normalizedItems]);

  return (
    <>
      {}
      <style>{`
        .items-page {
          padding: 20px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f5f7fb;
        }

        h2 {
          margin-bottom: 15px;
          color: #222;
          font-weight: 700;
        }

        .items-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 90px; /* leave space for bottom filter bar */
        }

        .item-card {
          background: #fff;
          padding: 15px;
          border-radius: 14px;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0,0,0,0.06);
        }

        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.12);
        }

        .item-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
          background: #eef1f7;
        }

        .item-card h4 {
          margin: 10px 0 4px;
          color: #1f2937;
          font-size: 16px;
          font-weight: 600;
        }

        .item-price {
          color: #4f46e5;
          font-weight: 700;
          margin: 4px 0 10px;
        }

        .btn {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 10px;
          background: #4f46e5;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 6px 14px rgba(79,70,229,0.25);
        }

        .btn:hover {
          background: #4338ca;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(67,56,202,0.28);
        }

        /* Bottom Filter Bar */
        .filter-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 -6px 16px rgba(0,0,0,0.06);
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-label {
          font-size: 14px;
          color: #374151;
          font-weight: 600;
        }

        .filter-select, .filter-range {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 14px;
          color: #111827;
        }

        .price-value {
          font-size: 14px;
          font-weight: 700;
          color: #4f46e5;
          margin-left: 4px;
          min-width: 80px;
          text-align: right;
        }

        @media (max-width: 640px) {
          .filter-bar {
            justify-content: center;
          }
        }
      `}</style>

      <div className="items-page">
        <h2>{headline}</h2>

        <div className="items-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="item-card" key={item._id}>
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <div className="item-price">₹{item.price}</div>
                <Link to={`/product/${item._id}`} className="btn">
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>

      {}
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Category:</span>
          <select
            className="filter-select"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {toTitle(c)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group" style={{ flex: 1, justifyContent: "flex-end" }}>
          <span className="filter-label">Max Price:</span>
          <input
            className="filter-range"
            type="range"
            min={minPrice}
            max={maxPrice}
            step="100"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
            style={{ width: "220px" }}
          />
          <span className="price-value">₹{filters.maxPrice}</span>
        </div>
      </div>
    </>
  );
}
