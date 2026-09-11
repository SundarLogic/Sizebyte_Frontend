import { useState } from "react";

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
    <div>
      <h1>Login</h1>

      <div>
        <button type="button" onClick={() => setRole("user")}>
          User
        </button>

        <button type="button" onClick={() => setRole("admin")}>
          Admin
        </button>
      </div>

      <h2>{role === "user" ? "User Login" : "Admin Login"}</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
