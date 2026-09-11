import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminProducts, deleteProduct } from "../api/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    getAdminProducts(token)
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    deleteProduct(productId, token)
      .then((data) => {
        alert(data.message);

        setProducts((currentProducts) =>
          currentProducts.filter((product) => product.id !== productId),
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div>
      <h1>Manage Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt={product.name} width="150" />

          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>
          <p>Stock: {product.quantity}</p>

          <Link to={`/admin/products/edit/${product.id}`}>
            <button>Update</button>
          </Link>

          <button onClick={() => handleDelete(product.id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default ManageProducts;
