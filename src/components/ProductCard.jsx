import { addToCart } from "../api/api";

function ProductCard({ product }) {
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    addToCart(product.id, 1, token)
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} width="200" />

      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.quantity}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
