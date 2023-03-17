import moment from "moment";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { toast, ToastContainer } from "react-toastify";
import baseUrl from "../helpers/baseUrl";
import classes from "../public/css/payment.module.css";

const cart = ({ products, token, payHistoryData }) => {
  const [data, setData] = useState(products);
  const [orderHistory, setOrderHistory] = useState(payHistoryData);
  const [qrData, setQrData] = useState("");
  const [qrToken, setQrToken] = useState("");
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  console.log(payHistoryData);

  const addressChangeHandler = (e) => {
    const { value, name } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const cardDataChangeHandler = (e) => {
    const { value, name } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const paymentHandler = async (e) => {
    const paymentData = {
      cardName: cardData.cardName,
      userId: data[0].user,
      address:
        address.street +
        ", " +
        address.city +
        ", " +
        address.state +
        ", " +
        address.zipCode,
      products: data[0].products.map((v) => ({
        product: v.product,
        quantity: v.quantity,
      })),
      orderNo: Math.ceil(Math.random() * 9000000),
      totalPrice: (prodTotal - discTotal + gstTotal + delCharge).toFixed(2),
    };

    const res = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const paydata = await res.json();

    if (paydata.message) {
      const res2 = await fetch(`${baseUrl}/api/payment`, {
        headers: {
          Authorization: token,
        },
      });

      const payHistoryData = await res2.json();
      setOrderHistory(payHistoryData);
    }
  };

  const prodTotal = data[0].productInfo
    .map((v, i) => v.price * data[0].products[i].quantity)
    .reduce((v, data) => v + data, 0);

  const discTotal = data[0].productInfo
    .map(
      (v, i) => ((v.price * v.discount) / 100) * data[0].products[i].quantity
    )
    .reduce((v, data) => v + data, 0);

  const gstTotal = (prodTotal * 18) / 100;

  const delCharge = prodTotal > 100 || prodTotal == 0 ? 0 : 5;
  const removeCartData = async (deleteId) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",
      body: JSON.stringify(deleteId),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    if (!data.message) {
      return;
    } else {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      const res2 = await fetch(`${baseUrl}/api/cart`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data2 = await res2.json();
      setData(data2);
    }
  };

  const updateQty = async (productQty, productId) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "POST",
      body: JSON.stringify({ qty: productQty, productId }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (!data.message) {
      return;
    } else {
      const res2 = await fetch(`${baseUrl}/api/cart`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data2 = await res2.json();
      setData(data2);
    }
  };

  const orderVerifyHandler = async () => {
    const res2 = await fetch(`${baseUrl}/api/payment`, {
      method: "PUT",
      body: JSON.stringify({ qrToken, orderHisId: qrData._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const orderHistorystatus = await res2.json();
    if (orderHistorystatus.message) {
      const res2 = await fetch(`${baseUrl}/api/payment`, {
        headers: {
          Authorization: token,
        },
      });

      const payHistoryData = await res2.json();
      setOrderHistory(payHistoryData);
    }
  };

  return (
    <>
      <section
        className="h-custom h-100"
        style={{ backgroundColor: "#d2c9ff", height: "100vh" }}
      >
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <h4 className="mb-0 fw-bold text-muted">
                            <span className="me-2 fs-5">
                              Total Products in Cart
                            </span>
                            {data[0].productInfo.length}
                          </h4>
                        </div>
                        <hr className="my-4" />

                        {data[0].productInfo.map((v, i) => (
                          <div
                            key={v._id}
                            className="row mb-4 d-flex justify-content-between align-items-center"
                          >
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={v.image}
                                className="img-fluid rounded-3"
                                alt="Cotton T-shirt"
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">
                                <Rating
                                  emptySymbol="bi bi-star text-warning me-1"
                                  placeholderSymbol="bi bi-star-half text-warning me-1"
                                  fullSymbol="bi bi-star-fill text-warning me-1"
                                  initialRating={v.rating}
                                  readonly
                                />
                              </h6>
                              <h6 className="text-black mb-0">{v.name}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                onClick={() =>
                                  updateQty(
                                    data[0].products[i].quantity - 1,
                                    v._id
                                  )
                                }
                                className="btn btn-link px-2"
                                disabled={data[0].products[i].quantity <= 1}
                              >
                                <i className="bi bi-dash-lg"></i>
                              </button>

                              <input
                                id="form1"
                                name="quantity"
                                value={data[0].products[i].quantity}
                                disabled
                                type="text"
                                className="form-control form-control-sm text-center"
                              />

                              <button
                                onClick={() =>
                                  updateQty(
                                    data[0].products[i].quantity + 1,
                                    v._id
                                  )
                                }
                                className="btn btn-link px-2"
                                disabled={
                                  data[0].products[i].quantity >= v.stock
                                }
                              >
                                <i className="bi bi-plus-lg"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3 offset-lg-1">
                              <p
                                className="item-price mb-0"
                                style={{ fontSize: "15px" }}
                              >
                                <strike>
                                  ${v.price * data[0].products[i].quantity}
                                </strike>{" "}
                                <span className="ms-2 text-success">
                                  $
                                  {(
                                    (v.price - (v.price * v.discount) / 100) *
                                    data[0].products[i].quantity
                                  ).toFixed(2)}
                                </span>
                              </p>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <button
                                onClick={() => removeCartData(v._id)}
                                className="btn text-muted"
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </div>
                          </div>
                        ))}

                        <hr className="my-4" />

                        <div className="pt-5">
                          <h6 className="mb-0">
                            <button className="btn fw-semibold">
                              <i className="bi bi-arrow-left me-2"></i>Back to
                              shop
                            </button>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4"
                      style={{
                        backgroundColor: "#eae8e8",
                        borderTopRightRadius: "15px",
                        borderBottomRightRadius: "15px",
                      }}
                    >
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5>{data[0].productInfo.length} Items</h5>
                          <h5>
                            $
                            {data[0].products.length != 0
                              ? prodTotal.toFixed(2)
                              : 0}
                          </h5>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <h5>Discount</h5>
                          <h5>
                            -$
                            {data[0].products.length != 0
                              ? discTotal.toFixed(2)
                              : 0}
                          </h5>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <h5>GST</h5>
                          <h5>
                            +$
                            {data[0].products.length != 0
                              ? gstTotal.toFixed(2)
                              : 0}
                          </h5>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <h5>Delivery Charges</h5>
                          <h5>
                            +$
                            {delCharge}
                          </h5>
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <h5>Total price</h5>
                          <h5>
                            $
                            {(
                              prodTotal -
                              discTotal +
                              gstTotal +
                              delCharge
                            ).toFixed(2)}
                          </h5>
                        </div>

                        <div className="d-grid">
                          <button
                            type="button"
                            className="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            BUY
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-5">
                  <h1 className="fw-bold mb-0 text-black">History</h1>
                  {orderHistory.map((v) => (
                    <div
                      className="card card-registration card-registration-2 p-3 mt-4"
                      key={v._id}
                      style={{
                        backgroundColor: "#eae8e8",
                        borderRadius: "15px",
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <h3 style={{ padding: "15px" }}>
                          Order Number:- {v.orderNo} (
                          {moment(v.createdAt).format("lll")})
                        </h3>
                        {v.delivery !== "Delivered Successfully" &&
                          v.delivery !== "Pending" && (
                            <button
                              className="btn btn-secondary fs-5"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal2"
                              onClick={() => setQrData(v)}
                            >
                              Scan QR
                            </button>
                          )}
                        <h3
                          className={`${
                            v.delivery === "Delivered Successfully" &&
                            "text-success"
                          } bg-white p-3 rounded`}
                        >
                          {v.delivery}
                        </h3>
                      </div>
                      <hr className="my-4" />
                      {v.productInfo.map((val, index) => (
                        <div className="row mb-4 d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={val.image}
                              className="img-fluid rounded-3"
                              alt="Cotton T-shirt"
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <h6 className="text-muted">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={val.rating}
                                readonly
                              />
                            </h6>
                            <h6 className="text-black mb-0">{val.name}</h6>
                          </div>
                          <div className="d-flex col-md-3 col-lg-3 col-xl-3">
                            <h4 className="me-2">
                              {v.products[index].quantity}
                            </h4>
                            <p className="me-2">×</p>
                            <h4>
                              ${val.price - (val.price * val.discount) / 100}
                            </h4>
                          </div>
                          <div className="d-flex col-md-3 col-lg-3 col-xl-3">
                            <h4>
                              $
                              {v.products[index].quantity *
                                (val.price - (val.price * val.discount) / 100)}
                            </h4>
                          </div>
                        </div>
                      ))}
                      <hr />
                      <h3 className="text-center">
                        Total:- ${v.totalPrice} (All Taxes & Charges Included)
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />

      {/* MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="text-uppercase fw-bold">Payment details</h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="card p-3" style={{ border: "none" }}>
                    <div className={`${classes.inputbox} mt-3`}>
                      {" "}
                      <input
                        type="text"
                        name="cardName"
                        className={`${classes["form-control"]} w-100`}
                        onChange={cardDataChangeHandler}
                        required
                      />{" "}
                      <span>Name on card</span>{" "}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={`${classes.inputbox} mt-3 mr-2`}>
                          {" "}
                          <input
                            type="number"
                            name="cardNumber"
                            maxLength="16"
                            className={`${classes["form-control"]} w-100`}
                            onChange={cardDataChangeHandler}
                            required
                          />{" "}
                          <i className="fa fa-credit-card"></i>{" "}
                          <span>Card Number</span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="d-flex gap-3 flex-row">
                          <div className={`${classes.inputbox} mt-3 mr-2`}>
                            {" "}
                            <input
                              type="text"
                              name="expiry"
                              className={`${classes["form-control"]} w-100`}
                              onChange={cardDataChangeHandler}
                              required
                            />{" "}
                            <span>Expiry</span>{" "}
                          </div>

                          <div className={`${classes.inputbox} mt-3 mr-2`}>
                            {" "}
                            <input
                              type="number"
                              name="cvv"
                              className={`${classes["form-control"]} w-100`}
                              onChange={cardDataChangeHandler}
                              required
                            />{" "}
                            <span>CVV</span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mb-4">
                      <h6 className="text-uppercase">Billing Address</h6>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <div className={`${classes.inputbox} mt-3 mr-2`}>
                            {" "}
                            <input
                              type="text"
                              name="street"
                              className={`${classes["form-control"]} w-100`}
                              onChange={addressChangeHandler}
                              required
                            />{" "}
                            <span>Street Address</span>{" "}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className={`${classes.inputbox} mt-3 mr-2`}>
                            {" "}
                            <input
                              type="text"
                              name="city"
                              className={`${classes["form-control"]} w-100`}
                              onChange={addressChangeHandler}
                              required
                            />{" "}
                            <span>City</span>{" "}
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-6">
                          <div className={`${classes.inputbox} mt-3 mr-2`}>
                            {" "}
                            <input
                              type="text"
                              name="state"
                              className={`${classes["form-control"]} w-100`}
                              onChange={addressChangeHandler}
                              required
                            />{" "}
                            <span>State/Province</span>{" "}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className={`${classes.inputbox} mt-3 mr-2`}>
                            {" "}
                            <input
                              type="text"
                              name="zipCode"
                              maxLength="6"
                              className={`${classes["form-control"]} w-100`}
                              onChange={addressChangeHandler}
                              required
                            />{" "}
                            <span>Zip code</span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className={`card ${classes["card-blue"]} p-3 text-white mb-3`}
                  >
                    <span>You have to pay</span>
                    <div className="d-flex flex-row align-items-end mb-3">
                      <h1 className="mb-0" style={{ color: "#fdcc49" }}>
                        $
                        {
                          (prodTotal - discTotal + gstTotal + delCharge)
                            .toFixed(2)
                            .split(".")[0]
                        }
                      </h1>{" "}
                      <span>
                        .
                        {
                          (prodTotal - discTotal + gstTotal + delCharge)
                            .toFixed(2)
                            .split(".")[1]
                        }
                      </span>
                    </div>

                    <span>
                      Enjoy all the features and perk after you complete the
                      payment
                    </span>

                    <div className={`${classes.hightlight}`}>
                      <span>
                        100% Guaranteed support and update for the next 5 years.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={paymentHandler}
                className="btn btn-success"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <div
        className="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">
                Scan Qr Code
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center">
                <img src={qrData.qrCode} alt="qr" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Verfication Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setQrToken(e.target.value)}
                  name="token"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={orderVerifyHandler}
                className="btn btn-primary"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const tokenData = token ? JSON.parse(token) : "";

  const res = await fetch(`${baseUrl}/api/cart`, {
    method: "GET",
    headers: {
      Authorization: tokenData.token,
    },
  });
  const data = await res.json();

  const res2 = await fetch(`${baseUrl}/api/payment`, {
    headers: {
      Authorization: tokenData.token,
    },
  });

  const payHistoryData = await res2.json();

  return {
    props: {
      products: data,
      token: tokenData.token,
      payHistoryData,
    },
  };
}

export default cart;
