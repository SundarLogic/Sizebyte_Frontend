import { useState } from "react";
import { Link } from "react-router-dom";
import { userLogin, adminLogin } from "../api/api";

function Login() {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const login = role === "user" ? userLogin : adminLogin;

    login(email, password)
      .then((data) => {
        if (role === "user") {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminId");

          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);

          alert("Login Successful");
          window.location.href = "/";
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");

          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminId", data.adminId);

          alert("Seller Login Successful");
          window.location.href = "/admin/dashboard";
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>

        <p className="auth-subtitle">Login to your SizeByte account</p>

        <div className="role-switch">
          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            Customer
          </button>

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Seller
          </button>
        </div>

        <h2>{role === "user" ? "Customer Login" : "Seller Login"}</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
