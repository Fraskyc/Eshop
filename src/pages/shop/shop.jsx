import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);

  const filteredProducts = PRODUCTS.filter(product => {
    return (
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Techno Shop</h1>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={e => setMinPrice(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={e => setMaxPrice(parseInt(e.target.value))}
        />
      </div>
      <div className="products">
        {filteredProducts.map(product => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
