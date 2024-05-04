import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import "./ProductDetails.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(ShopContext);
  const product = PRODUCTS.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const cartItemsAmount = cartItems[id];

  return (
    <div className="productDetail">
      <img src={product.productImage} alt={product.productName} />
      <div className="details">
        <h2>{product.productName}</h2>
        <p className="price">${product.price}</p>
        <p className="description">This is the description of {product.productName}</p>
        <button
          className="addToCartBttn"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}
        </button>
      </div>
    </div>
  );
};
