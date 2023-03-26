import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Register.scss";
const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const URL = "http://localhost:4000/users";
  const RegisterForm = async () => {
    await fetch(`${URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.json("Sd"));
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err.message);
        setRedirect(false);
      });
    setRedirect(true);
  };
  if (redirect) {
    //window.location.href = "/login";
  }

  const OnRegister = async (e) => {
    e.preventDefault();
    RegisterForm();
    setFirstname("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
    window.location.href = "/login";
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <form onSubmit={OnRegister}>
            <h1>Register Form</h1>
            <label>First Name</label>
            <input
              type="text"
              label="First Name"
              value={firstname}
              name="firstname"
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="John"
            />
            <label>Last Name</label>
            <input
              type="text"
              label="Last Name"
              value={lastname}
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Doe"
            />
            <label>Username</label>
            <input
              type="text"
              label="Username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe123"
            />
            <label>Email</label>
            <input
              type="email"
              label="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
            />
            <label>Password</label>
            <input
              type="password"
              label="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
            />
            <br></br>
            <br></br>
            <button>Submit</button>
          </form>
        </div>
        <div className="right">
          <h1>Hello</h1>
          <p>
            Lorem ipsum gatel kijndfjlsnkflnsdkln n nfsdfnksdn klnsdklfnskln
            klsnglnsjlgnfkl nsklnf lsk snklgnfdsgn snk ng nsklgnskdngkdfngn
            lnklngknsifjpwjbj igigpsnfznfonwogown k idgnsif jovgj inkl iogveip g
          </p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
