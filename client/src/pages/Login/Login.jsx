import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
const Login = ({ setUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const LoginSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const token = await response.json();
      //localStorage.setItem("token", token["jwt"]);

      setUser(token);
      // if (token) {
      window.location.href = "/";
      // } else {
      //   window.location.href = "/login";
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    LoginSubmit();
    toast.success("Logged in Successfully");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Social Media App</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
            tempore quas minus pariatur quibusdam sed perferendis iusto unde aut
            praesentium voluptatem amet nobis temporibus, dolorum aliquid labore
            incidunt accusamus iste optio nesciunt, itaque deserunt soluta. Sed
            vitae neque, exercitationem iure voluptas tempora corrupti suscipit,
            libero, repellat facere omnis nam ea!
          </p>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <form onSubmit={onLogin}>
            <h1>Login Form</h1>
            <label>Email</label>
            <input
              value={email}
              name="email"
              type="email"
              className="email-input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
            />
            <label>Password</label>
            <input
              value={password}
              name="password"
              type="password"
              className="password-input"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
            <br></br>
            <a href="forgot-password" target="_blank">
              Forgot Password
            </a>
            <br></br>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
