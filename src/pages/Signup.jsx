import { useState } from "react";

const API_URL = "https://sizebyte.vercel.app";

function Signup() {
  const [role, setRole] = useState("user");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    const endpoint = role === "user" ? "/user/signup" : "/admin/signup";

    fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        address: address,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong");
      });
  };

  return (
    <div>
      <h1>Signup</h1>

      <div>
        <button type="button" onClick={() => setRole("user")}>
          User
        </button>

        <button type="button" onClick={() => setRole("admin")}>
          Admin
        </button>
      </div>

      <h2>{role === "user" ? "User Signup" : "Admin Signup"}</h2>

      <form onSubmit={handleSignup}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

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

        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
