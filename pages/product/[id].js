import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../helpers/baseUrl";
import classes from "../../public/css/productdetail.module.css";

const ProductDetail = ({ product }) => {
  const { token } = parseCookies();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const tokenData = token ? JSON.parse(token) : "";

  const deleteHandler = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    await res.json();
  };

  const addToCartHandler = async () => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      body: JSON.stringify({ quantity: qty, productId: product._id }),
      headers: {
        Authorization: tokenData.token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.message) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="container">
        <div
          className={`col-lg-8 border p-3 ${classes["main-section"]} bg-white`}
        >
          <div className="row m-0">
            <div
              className={`col-lg-6 d-flex gap-2 ${classes["left-side-product-box"]} pb-3}`}
            >
              <div className="col-2">
                {product.sideimage.map((v) => (
                  <img src={v} className="border mb-2" />
                ))}
              </div>
              <div className="col-8">
                <img src={product.image} className="border img-fluid" />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className={`${classes["right-side-pro-detail"]} border p-3 m-0`}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <span>Who What Wear</span>
                    <p className="m-0 p-0">{product.name}</p>
                  </div>
                  <div className="col-lg-12">
                    <p className="m-0 p-0" style={{ color: "#E45641" }}>
                      ₹{product.price}
                    </p>
                    <hr className="p-0 m-0" />
                  </div>
                  <div className="col-lg-12 pt-2">
                    <h5>Product Detail</h5>
                    <span>{product.description}</span>
                    <hr className="m-0 pt-2 mt-2" />
                  </div>
                  <div className="col-lg-12">
                    <p className="tag-section">
                      <strong>Tag : </strong>
                      <button className="btn p-0 text-primary">Woman,</button>
                      <button className="btn p-0 text-primary">Man</button>
                    </p>
                  </div>
                  {token ? (
                    <>
                      <h6>Quantity :</h6>
                      <div className="col-lg-8 input-group">
                        <button
                          className="btn btn-success"
                          onClick={() => setQty((qt) => qt + 1)}
                          type="button"
                        >
                          <i className="bi bi-plus-lg"></i>
                        </button>
                        <input
                          type="number"
                          min="1"
                          className="form-control text-center col-8"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        />
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            if (qty <= 1) {
                              setQty(1);
                            } else {
                              setQty((qt) => qt - 1);
                            }
                          }}
                          type="button"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                      </div>
                      <div className="col-lg-12 mt-3">
                        <div className="row">
                          <div className="col-lg-6 pb-2">
                            <button
                              onClick={addToCartHandler}
                              className="btn btn-danger w-100"
                            >
                              Add To Cart
                            </button>
                          </div>
                          <div className="col-lg-6">
                            <button className="btn btn-success w-100">
                              Shop Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="col-lg-12 mt-3">
                      <div className="row">
                        <div className="col-lg-6 pb-2">
                          <button
                            onClick={() => router.push("/login")}
                            className="btn btn-primary"
                          >
                            login to Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();

  return {
    props: { product: data },
  };
}

export default ProductDetail;
