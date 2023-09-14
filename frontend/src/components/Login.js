import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const parseRes = await response.json();
      console.log({ parseRes });
      const userInfo = parseRes.auth;
      const jwt = parseRes.access;

      console.log(userInfo);
      console.log(jwt);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("JWTToken", jwt);
      if (parseRes.access) {
        setAuth(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={onSubmitForm}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={inputs.email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={inputs.password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <button className="btn btn-success btn-block">login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
