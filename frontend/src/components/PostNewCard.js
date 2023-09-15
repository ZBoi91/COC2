import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const jwtTokenKey = "JWTToken";
const getJWT = localStorage.getItem(jwtTokenKey);

const PostNewCard = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    Games: "",
    Name: "",
    Price: "",
    Description: "",
    CardsID: "",
    Image: "",
  });

  const navigate = useNavigate();
  const { Games, Name, Price, CardsID, Description, Image } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const userInfo = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(userInfo);
    const SellerID = parsedUser.UserID;

    try {
      const CardsID = parseInt(inputs.CardsID);
      const Price = parseInt(inputs.Price);
      const body = {
        SellerID,
        Games,
        Name,
        Price,
        Description,
        CardsID,
        Image,
      };

      console.log({ body });

      const response = await fetch("http://localhost:5000/api/COC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJWT}`,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log({ parseRes });
      //   if (parseRes.status === "ok") {
      //     navigate("/profile");
      //   }
    } catch (err) {
      console.log(err.message);
    }
  };

  const logoutHandler = async () => {
    const res = await fetch("http://localhost:5000/auth/logout");
    console.log(res);
    setAuth(false);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Add listing</h2>
                <form onSubmit={onSubmitForm}>
                  <div className="form-group">
                    <label>Games</label>
                    <input
                      type="text"
                      name="Games"
                      className="form-control"
                      value={Games}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="Name"
                      className="form-control"
                      value={Name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      name="Price"
                      className="form-control"
                      value={Price}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      name="Description"
                      className="form-control"
                      value={Description}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>CardsID</label>
                    <input
                      type="number"
                      name="CardsID"
                      className="form-control"
                      value={CardsID}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="text"
                      name="Image"
                      className="form-control"
                      value={Image}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <button className="btn btn-success btn-block">
                    Add listing
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

export default PostNewCard;
