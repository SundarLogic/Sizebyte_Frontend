import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProducts, deleteProduct } from "../api/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const navigate = useNavigate();

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
  }, [token]);

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
    <div className="admin-page">
      <div className="admin-header">
        <h1>Seller Dashboard</h1>
        <p>Manage your SizeByte store</p>
      </div>

      <div className="admin-products">
        <h2>Products ({products.length})</h2>

        {products.length === 0 ? (
          <p>You haven't added any products yet.</p>
        ) : (
          <div className="admin-product-grid">
            {products.map((product) => (
              <div className="admin-product-card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />

                <h3>{product.name}</h3>

                <p>Category: {product.category}</p>
                <p>Description: {product.description}</p>
                <p>Price: ₹{product.price}</p>
                <p>Stock: {product.quantity}</p>

                <div className="admin-product-actions">
                  <button
                    className="update-button"
                    onClick={() =>
                      navigate(`/admin/products/edit/${product.id}`)
                    }
                  >
                    Update
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
