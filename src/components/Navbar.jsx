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
      <h2>SizeByte</h2>

      {!userToken && !adminToken && (
        <>
          <Link to="/">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

      {userToken && (
        <>
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>

          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {adminToken && (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/products">Manage Products</Link>
          <Link to="/admin/orders">Orders</Link>

          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
