import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <Link to="/admin/products/add">
        <button>Add Product</button>
      </Link>

      <Link to="/admin/products">
        <button>Manage Products</button>
      </Link>

      <Link to="/admin/orders">
        <button>View Orders</button>
      </Link>
    </div>
  );
}

export default AdminDashboard;
