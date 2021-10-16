import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import {MdEmail, MdOutlineLock } from "react-icons/md";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.status === "error"){
        setError(true);
        setErrorMsg(data.message);
        setTimeout(() => {
          setErrorMsg("");
          setError(false);
        }, 5000);
        return;
      }else{
        localStorage.setItem("token", data.token);
        history.push("/");
      }
  }

  return (
    <div className="login">
      <div className="heading">The Programmer's Quiz 👩‍💻</div>

      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">
          <MdEmail /> Enter Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">
          <MdOutlineLock /> Enter Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button> <Link to="/register">register</Link>
        <br /><br />
        {error && <div className="error">{errorMsg}</div>}
      </form>
    </div>
  );
}

export default Login;
