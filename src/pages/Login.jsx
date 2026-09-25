import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://sizebyte.vercel.app";

function Login() {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const endpoint = role === "user" ? "/user/login" : "/admin/login";

    fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.token) {
          alert(data.message);
          return;
        }

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

          alert("Admin Login Successful");
          window.location.href = "/admin/dashboard";
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong");
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
            User
          </button>

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <h2>{role === "user" ? "User Login" : "Admin Login"}</h2>

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
