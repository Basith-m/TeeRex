import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart, removeFromCart } from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartArray = useSelector((state) => state.cartReducer);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate()

  const getCartTotal = () => {
    if (cartArray.length > 0) {
      setTotal(cartArray.map((item) => item.price).reduce((p1, p2) => p1 + p2));
    } else {
      setTotal(0);
    }
  };

  const handleCart = () =>{
    dispatch(emptyCart())
    alert("Order successfully Placed... Thank you for purchasing with us!!!")
    navigate('/')

  }

  useEffect(() => {
    getCartTotal();
  }, [cartArray]);

  return (
    <div className="container mb-5" style={{ marginTop: "100px" }}>
      {cartArray?.length > 0 ? (
        <div className="row mt-5">
          <div className="col-lg-7">
            <table className="table shadow border text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartArray.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product?.title}</td>
                    <td>
                      <img
                        height={"100px"}
                        width={"100px"}
                        src={product.image}
                        alt=""
                      />
                    </td>
                    <td>$ {product?.price}</td>
                    <td>
                      <i
                        className="fa-solid fa-trash text-danger me-2"
                        onClick={() => dispatch(removeFromCart(product.id))}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-4">
            <div className="border p-3 rouded shadow">
              <h1 className="text-primary">Cart Summary</h1>
              <h4 className="mt-3">
                Total Products :
                <span className="text-danger fw-bolder fs-2 ms-3">{cartArray.length}</span>
              </h4>
              <h4 className="mt-3">
                Total Price :
                <span className="text-danger fw-bolder fs-2 ms-3">$ {total}</span>
              </h4>
              <div className="d-grid mt-5">
                <button className="btn btn-success rounded" onClick={handleCart}>Check Out</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "60vh" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img
            height={"250px"}
            src="https://cdn-icons-gif.flaticon.com/8797/8797960.gif"
            alt=""
          />
          <h3 className="fw-bolder text-primary">Your Cart is Empty!!!</h3>
          <Link
            style={{ textDecoderation: "none" }}
            className="btn btn-success rounded mt-3"
            to={"/"}
          >
            Back To Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
