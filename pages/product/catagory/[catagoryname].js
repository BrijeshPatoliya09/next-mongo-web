import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Rating from "react-rating";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../../helpers/baseUrl";

let initial = false;

const CatagoryName = ({ products }) => {
  const [data, setData] = useState(products);
  const { token } = parseCookies();
  const tokenData = token ? JSON.parse(token) : "";

  const filterdata = localStorage.getItem("filter")
    ? JSON.parse(localStorage.getItem("filter"))
    : "";

  const [prodCheck, setProdCheck] = useState(
    filterdata !== "" ? filterdata.prodCheck : "TV"
  );
  const [prodBrandCheck, setProdBrandCheck] = useState(
    filterdata !== "" ? filterdata.prodBrandCheck : []
  );
  const [prodTypeCheck, setProdTypeCheck] = useState(
    filterdata !== "" ? filterdata.prodTypeCheck : []
  );
  const [prodSizeCheck, setProdSizeCheck] = useState(
    filterdata !== "" ? filterdata.prodSizeCheck : []
  );
  const [prodDiscount, setProdDiscount] = useState(
    filterdata !== "" ? filterdata.prodDiscount : []
  );
  const [prodRating, setProdRating] = useState(
    filterdata !== "" ? filterdata.prodRating : []
  );
  const [prodPrice, setProdPrice] = useState(
    filterdata !== "" ? filterdata.prodPrice : { min: "0", max: "1500+" }
  );
  const [filterField, setFilterField] = useState([]);

  const router = useRouter();

  const combineItem = (combData, itemVal) => {
    const prodTypeData = combData.reduce((acc, obj) => {
      let found = false;
      for (let i = 0; i < acc.length; i++) {
        if (acc[i][itemVal] === obj[itemVal]) {
          found = true;
          acc[i].count++;
        }
      }
      if (!found) {
        obj.count = 1;
        acc.push(obj);
      }
      return acc;
    }, []);
    return prodTypeData;
  };

  const prodBrandCheckBox = (data, e) => {
    if (prodBrandCheck.find((v) => v == data.brand)) {
      const filterData = prodBrandCheck.filter((v) => v !== data.brand);
      setProdBrandCheck(filterData);
    } else {
      setProdBrandCheck([...prodBrandCheck, data.brand]);
    }
  };

  const prodTypeCheckBox = (data, e) => {
    if (prodTypeCheck.find((v) => v == data.type)) {
      const filterData = prodTypeCheck.filter((v) => v !== data.type);
      setProdTypeCheck(filterData);
    } else {
      setProdTypeCheck([...prodTypeCheck, data.type]);
    }
  };

  const prodSizeCheckBox = (data, e) => {
    if (prodSizeCheck.find((v) => v == data.sizeorweight)) {
      const filterData = prodSizeCheck.filter((v) => v !== data.sizeorweight);
      setProdSizeCheck(filterData);
    } else {
      setProdSizeCheck([...prodSizeCheck, data.sizeorweight]);
    }
  };

  const prodDiscountCheckbox = (num, e) => {
    if (prodDiscount.find((v) => v == num)) {
      const filterData = prodDiscount.filter((v) => v !== num);
      setProdDiscount(filterData);
    } else {
      setProdDiscount([...prodDiscount, num]);
    }
  };

  const prodRatingCheckbox = (num, e) => {
    if (prodRating.find((v) => v == num)) {
      const filterData = prodRating.filter((v) => v !== num);
      setProdRating(filterData);
    } else {
      setProdRating([...prodRating, num]);
    }
  };

  const filterHandler = async () => {
    // debugger
    localStorage.setItem(
      "filter",
      JSON.stringify({
        prodBrandCheck,
        prodCheck,
        prodRating,
        prodPrice,
        prodTypeCheck,
        prodSizeCheck,
        prodDiscount,
      })
    );

    if (prodPrice.min !== "0" || prodPrice.max !== "1500+") {
      setFilterField([
        ...prodBrandCheck,
        ...prodRating,
        ...prodTypeCheck,
        ...prodSizeCheck,
        ...prodDiscount,
        `${prodPrice.min} - ${prodPrice.max}`,
      ]);
    } else {
      setFilterField([
        ...prodBrandCheck,
        ...prodRating,
        ...prodTypeCheck,
        ...prodSizeCheck,
        ...prodDiscount,
      ]);
    }

    const res = await fetch(`${baseUrl}/api/product/catagory/filter`, {
      method: "PUT",
      body: JSON.stringify({
        prodBrandCheck,
        prodCheck,
        prodRating,
        prodPrice,
        prodTypeCheck,
        prodSizeCheck,
        prodDiscount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    setData(resData);
  };
  useEffect(() => {
    filterHandler();
  }, [
    prodBrandCheck,
    prodCheck,
    prodRating,
    prodPrice,
    prodTypeCheck,
    prodSizeCheck,
    prodDiscount,
  ]);

  useEffect(() => {
    if (initial) {
      setProdBrandCheck([]);
      setProdTypeCheck([]);
      setProdSizeCheck([]);
      setProdDiscount([]);
      setProdRating([]);
      setProdPrice({ min: "0", max: "1500+" });
    }
    initial = true;
  }, [prodCheck]);

  const cancelFilterHandler = async (filterV) => {
    const filteredBrand = prodBrandCheck.filter((val) => val !== filterV);
    const filteredType = prodTypeCheck.filter((val) => val !== filterV);
    const filteredSize = prodSizeCheck.filter((val) => val !== filterV);
    const filteredDiscount = prodDiscount.filter((val) => val !== filterV);
    const filteredRating = prodRating.filter((val) => val !== filterV);
    const filteredPrice = { min: "0", max: "1500+" };
    setProdBrandCheck([...filteredBrand]);
    setProdTypeCheck([...filteredType]);
    setProdSizeCheck([...filteredSize]);
    setProdDiscount([...filteredDiscount]);
    setProdRating([...filteredRating]);
    setProdPrice(filteredPrice);
  };

  const addToCartHandler = async (qty, product) => {
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
      <section className="prd_list">
        <div className="container-fluid px-5">
          <div className="row px-5">
            <div className="d-md-flex align-items-md-center">
              <div className="h3">{products[0].subcatagory}</div>
              <div className="ml-auto d-flex align-items-center ms-auto me-5 views">
                {" "}
                <span className="green-label px-md-2 px-1">
                  {products.length}
                </span>{" "}
                <span className="text-muted">Products</span>{" "}
              </div>
            </div>
            <div className="d-lg-flex align-items-lg-center pt-2">
              {combineItem(products, "product").map((val, i) => (
                <div
                  key={i}
                  className="form-inline d-flex align-items-center my-2 checkbox bg-light border mx-lg-2"
                >
                  {" "}
                  <label className="options">
                    {val.product}{" "}
                    <input
                      type="radio"
                      name="brand"
                      value={val.product}
                      checked={prodCheck == val.product}
                      onChange={() => setProdCheck(val.product)}
                    />{" "}
                    <span className="checkmark"></span>{" "}
                  </label>{" "}
                  <span className="text-success px-2 count"> {val.count}</span>{" "}
                </div>
              ))}
            </div>
            <div className="d-sm-flex align-items-sm-center pt-2 clear">
              <div className="text-muted filter-label">Applied Filters:</div>
              {filterField.map((v) => {
                if (v == 2 || v == 3 || v == 4) {
                  return (
                    <div className="green-label font-weight-bold p-0 px-1 mx-sm-1 mx-0">
                      {v}
                      <span className="fas fa-star text-success"></span>{" "}
                      <span
                        onClick={() => cancelFilterHandler(v)}
                        style={{ cursor: "pointer" }}
                        className=" px-1 close"
                      >
                        &times;
                      </span>{" "}
                    </div>
                  );
                }
                if (v == 1 || v == 10 || v == 20 || v == 30) {
                  return (
                    <div className="green-label font-weight-bold p-0 px-1 mx-sm-1 mx-0">
                      {v}%{" "}
                      <span
                        onClick={() => cancelFilterHandler(v)}
                        style={{ cursor: "pointer" }}
                        className=" px-1 close"
                      >
                        &times;
                      </span>{" "}
                    </div>
                  );
                }
                return (
                  <div className="green-label font-weight-bold p-0 px-1 mx-sm-1 mx-0">
                    {v}{" "}
                    <span
                      onClick={() => cancelFilterHandler(v)}
                      style={{ cursor: "pointer" }}
                      className=" px-1 close"
                    >
                      &times;
                    </span>{" "}
                  </div>
                );
              })}
            </div>
            <div className="col-3">
              <div className="py-3">
                <h5 className="font-weight-bold">Brands</h5>
                <form className="brand">
                  {products
                    .filter((filVal) => prodCheck == filVal.product)
                    .map((brandV) => {
                      return (
                        <div className="form-inline d-flex align-items-center py-1">
                          {" "}
                          <label className="tick">
                            {brandV.brand}{" "}
                            <input
                              type="checkbox"
                              value={brandV.brand}
                              checked={
                                prodBrandCheck.filter((v) => v == brandV.brand)
                                  .length > 0
                              }
                              onClick={(e) => prodBrandCheckBox(brandV, e)}
                            />{" "}
                            <span className="check"></span>{" "}
                          </label>{" "}
                        </div>
                      );
                    })}
                </form>
              </div>
              <div className="py-3">
                <h5 className="font-weight-bold">Type</h5>
                <form className="brand">
                  {/* elpfmpw */}
                  {combineItem(products, "type")
                    .filter((filVal) => prodCheck == filVal.product)
                    .map((typeV) => (
                      <div className="form-inline d-flex align-items-center py-1">
                        {" "}
                        <label className="tick">
                          {typeV.type}{" "}
                          <input
                            type="checkbox"
                            value={typeV.type}
                            checked={
                              prodTypeCheck.filter((v) => v == typeV.type)
                                .length > 0
                            }
                            onClick={(e) => prodTypeCheckBox(typeV, e)}
                          />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    ))}
                </form>
              </div>
              <div className="py-3">
                <h5 className="font-weight-bold">Size / Weight</h5>
                <form className="brand">
                  {/* elpfmpw */}
                  {combineItem(products, "sizeorweight")
                    .filter((filVal) => prodCheck == filVal.product)
                    .map((sizeV) => (
                      <div className="form-inline d-flex align-items-center py-1">
                        {" "}
                        <label className="tick">
                          {sizeV.sizeorweight}{" "}
                          <input
                            type="checkbox"
                            value={sizeV.sizeorweight}
                            checked={
                              prodSizeCheck.filter(
                                (v) => v == sizeV.sizeorweight
                              ).length > 0
                            }
                            onClick={(e) => prodSizeCheckBox(sizeV, e)}
                          />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    ))}
                </form>
              </div>
              <div className="py-3">
                <h5 className="font-weight-bold">Price</h5>
                <form className="brand d-flex gap-2">
                  <div className="col-5">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) =>
                        setProdPrice({ ...prodPrice, min: e.target.value })
                      }
                    >
                      <option selected={prodPrice.min == "0"} value="0">
                        Min
                      </option>
                      <option selected={prodPrice.min == "100"} value="100">
                        100
                      </option>
                      <option selected={prodPrice.min == "250"} value="250">
                        250
                      </option>
                      <option selected={prodPrice.min == "500"} value="500">
                        500
                      </option>
                      <option selected={prodPrice.min == "750"} value="750">
                        750
                      </option>
                      <option selected={prodPrice.min == "1000"} value="1000">
                        1000
                      </option>
                      <option selected={prodPrice.min == "1500"} value="1500">
                        1500
                      </option>
                    </select>
                  </div>
                  <div className="col-5">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) =>
                        setProdPrice({ ...prodPrice, max: e.target.value })
                      }
                    >
                      <option selected={prodPrice.max == "100"} value="100">
                        100
                      </option>
                      <option selected={prodPrice.max == "250"} value="250">
                        250
                      </option>
                      <option selected={prodPrice.max == "500"} value="500">
                        500
                      </option>
                      <option selected={prodPrice.max == "750"} value="750">
                        750
                      </option>
                      <option selected={prodPrice.max == "1000"} value="1000">
                        1000
                      </option>
                      <option selected={prodPrice.max == "1500"} value="1500">
                        1500
                      </option>
                      <option selected={prodPrice.max == "1500+"} value="1500+">
                        1500+
                      </option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="py-3">
                <h5 className="font-weight-bold">Discount</h5>
                <form className="rating">
                  <div className="form-inline d-flex align-items-center py-1">
                    {" "}
                    <label className="tick">
                      30% & Above
                      <input
                        type="checkbox"
                        value={30}
                        checked={prodDiscount.some((v) => v == 30)}
                        onClick={(e) => prodDiscountCheckbox(30, e)}
                      />{" "}
                      <span className="check"></span>{" "}
                    </label>{" "}
                  </div>
                  <div className="form-inline d-flex align-items-center py-1">
                    {" "}
                    <label className="tick">
                      20% & Above
                      <input
                        type="checkbox"
                        value={20}
                        checked={prodDiscount.some((v) => v == 20)}
                        onClick={(e) => prodDiscountCheckbox(20, e)}
                      />{" "}
                      <span className="check"></span>{" "}
                    </label>{" "}
                  </div>
                  <div className="form-inline d-flex align-items-center py-1">
                    {" "}
                    <label className="tick">
                      10% & Above
                      <input
                        type="checkbox"
                        value={10}
                        checked={prodDiscount.some((v) => v == 10)}
                        onClick={(e) => prodDiscountCheckbox(10, e)}
                      />{" "}
                      <span className="check"></span>{" "}
                    </label>{" "}
                  </div>
                  <div className="form-inline d-flex align-items-center py-1">
                    {" "}
                    <label className="tick">
                      1% & Above
                      <input
                        type="checkbox"
                        value={1}
                        checked={prodDiscount.some((v) => v == 1)}
                        onClick={(e) => prodDiscountCheckbox(1, e)}
                      />{" "}
                      <span className="check"></span>{" "}
                    </label>{" "}
                  </div>
                </form>
              </div>
              <div className="py-3">
                <h5 className="font-weight-bold">Rating</h5>
                <form className="rating">
                  <div className="form-inline d-flex align-items-center py-1">
                    {" "}
                    <label className="tick">
                      2<span className="fas fa-star text-black"></span> & Above
                      <input
                        type="checkbox"
                        value={2}
                        checked={prodRating.some((v) => v == 2)}
                        onClick={(e) => prodRatingCheckbox(2, e)}
                      />{" "}
                      <span className="check"></span>{" "}
                    </label>{" "}
                  </div>
                  <div className="form-inline d-flex align-items-center py-1">
                    {" "}
                    <label className="tick">
                      3<span className="fas fa-star text-black"></span> & Above
                      <input
                        type="checkbox"
                        value={3}
                        checked={prodRating.some((v) => v == 3)}
                        onClick={(e) => prodRatingCheckbox(3, e)}
                      />{" "}
                      <span className="check"></span>{" "}
                    </label>{" "}
                  </div>
                  <div className="form-inline d-flex align-items-center py-1">
                    {" "}
                    <label className="tick">
                      4<span className="fas fa-star text-black"></span> & Above
                      <input
                        type="checkbox"
                        value={4}
                        checked={prodRating.some((v) => v == 4)}
                        onClick={(e) => prodRatingCheckbox(4, e)}
                      />{" "}
                      <span className="check"></span>{" "}
                    </label>{" "}
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-9">
              {data.map((v) => {
                const desc = v.description.split(".");
                return (
                  <div className="card card-body mb-3">
                    <div className="media d-flex align-items-center col-12">
                      <div className="mr-2 mb-3 mb-lg-0 col-2">
                        <img
                          src={v.image}
                          className="img-fluid"
                          width="150"
                          height="150"
                          alt=""
                        />
                      </div>

                      <div className="media-body col-7">
                        <h6 className="media-title font-weight-semibold">
                          <Link href={`/product/${v._id}`} data-abc="true">
                            {v.name}
                          </Link>
                        </h6>

                        <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                          <li className="list-inline-item">
                            <a href="#" className="text-muted" data-abc="true">
                              {v.subcatagory}
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="text-muted" data-abc="true">
                              {v.type}
                            </a>
                          </li>
                        </ul>

                        <p className="mb-3">
                          {desc[0] + " " + desc[1]}{" "}
                          <Link href={`/product/${v._id}`} data-abc="true">
                            Show More
                          </Link>
                        </p>
                      </div>

                      <div className="mt-3 mt-lg-0 ml-lg-3 text-center col-3">
                        <h3 className="mb-0 font-weight-semibold">
                          ${v.price - (v.price * (v.discount / 100)).toFixed(2)}
                        </h3>

                        <div>
                          <Rating
                            emptySymbol="bi bi-star text-warning me-1"
                            placeholderSymbol="bi bi-star-half text-warning me-1"
                            fullSymbol="bi bi-star-fill text-warning me-1"
                            initialRating={v.rating}
                            readonly
                          />
                        </div>
                        <div>
                          <span className="text-muted text-decoration-line-through">
                            {v.price}
                          </span>{" "}
                          <span className="text-success">{v.discount}%</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCartHandler(1, v)}
                          className="btn btn-warning mt-4 text-white"
                        >
                          <i className="icon-cart-add mr-2"></i> Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const catagory = ctx.query.catagoryname;
  const res = await fetch(`${baseUrl}/api/product/catagory/${catagory}`);
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}

export default CatagoryName;
