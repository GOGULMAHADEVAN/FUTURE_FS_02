import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "https://future-fs-02-lb7r.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      window.location.href =
        "/dashboard";
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Lead Management System</h1>

        <input
          placeholder="Username"
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

      </div>
    </div>
  );
}
