import { Link } from "react-router-dom";

function Navbar() {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");

    window.location.href = "/";
  };

  return (
    <nav>
      <div className="brand">
        <h2>SizeByte</h2>
        <p>Tech for a Bigger You</p>
      </div>

      {!userToken && !adminToken && (
        <div className="guest-links">
          <Link to="/">Products</Link>

          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      )}

      {userToken && (
        <div className="user-links">
          <div>
            <Link to="/">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
          </div>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {adminToken && (
        <div className="admin-navbar">
          <Link to="/admin/dashboard">Dashboard</Link>

          <div className="admin-navbar-right">
            <Link to="/admin/products/add">Add Product</Link>
            <Link to="/admin/orders">Orders</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
