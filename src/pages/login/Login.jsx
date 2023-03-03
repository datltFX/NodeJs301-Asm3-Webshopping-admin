import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../components/axios/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    axiosClient
      .post("/login", data)
      .then((res) => {
        // console.log(res.data);
        const user = res.data;
        if (user.role === "admin") {
          localStorage.setItem("userActive", JSON.stringify(user));
          navigate("/products");
        } else if (user.role === "counselors") {
          navigate("/chat");
        } else {
          alert("You are not authentication!");
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  //render
  return (
    <div className="d-flex justify-content-center align-item-center vh-100">
      <form
        className="d-flex flex-column justify-content-center "
        style={{ width: "30%" }}
        onSubmit={loginHandler}
      >
        <h1 className="align-self-center p-3">Login</h1>
        <div className="form-group ">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control "
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
