import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    location: "",
  });

  const navigate = useNavigate();
  const { email, password, name, location } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name, location };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.status === "ok") {
        navigate("/login");
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
                <h2 className="card-title text-center mb-4">Register</h2>
                <form onSubmit={onSubmitForm}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={location}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <button className="btn btn-success btn-block">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
