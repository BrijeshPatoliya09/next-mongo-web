import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import baseUrl from "../helpers/baseUrl";

const create = ({token}) => {
  const decodeToken = jwt.decode(token)
  const [name, setName] = useState("");
  const [brand, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");
  const [sizeOrWeight, setSizeOrWeight] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [mulImage, setMulImage] = useState([]);
  const [catagory, setCatagory] = useState("");
  const [subCatagory, setSubCatagory] = useState("");
  const [stock, setStock] = useState("");
  const [product, setProduct] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const img = await imageUpload();
    const prodData = {
      name,
      brand,
      image: img,
      sideimage: mulImage,
      type,
      sizeorweight: sizeOrWeight,
      description,
      price,
      rating,
      discount,
      stock,
      catagory,
      subcatagory: subCatagory,
      product, 
      seller: decodeToken.userId
    };

    const res = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      body: JSON.stringify(prodData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
  };

  const multiImageHandler = async (e) => {
    const img = e.target.files[0];
    const imageUrl = await imageUpload(img);
    setMulImage([...mulImage, imageUrl]);
  };

  const imageUpload = async (img) => {
    const formData = new FormData();
    formData.append("file", img || image);
    formData.append("upload_preset", "mystore");
    formData.append("cloud_name", "bj09");

    const res = await fetch(`${process.env.CLOUDINARY_URL}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.url;
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        className="col-5 p-5 border rounded border-3 border-primary border-opacity-50"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-primary">Create</h1>
        <div className="d-flex gap-2">
          <div className="mb-3 col-4">
            <select
              className="form-select form-select-lg"
              aria-label=".form-select-lg example"
              onChange={(e) => setCatagory(e.target.value)}
            >
              <option value="" selected>
                Select Product Catagor
              </option>
              <option value="Electronics Product">Electronics Product</option>
              <option value="Garments & Fashion Product">
                Garments & Fashion Product
              </option>
              <option value="Sports, Books & more">Sports, Books & more</option>
            </select>
          </div>
          <div className="mb-3 col-4">
            {catagory === "" && (
              <>
                <select
                  className="form-select form-select-lg"
                  aria-label=".form-select-lg example"
                  disabled
                  onChange={(e) => setSubCatagory(e.target.value)}
                >
                  <option selected>Select product sub catagory</option>
                </select>
                <p className="text-danger mb-0">
                  Please select product catagory first
                </p>
              </>
            )}
            {catagory === "Electronics Product" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setSubCatagory(e.target.value)}
              >
                <option selected>Select product sub catagory</option>
                <option value="TV & Appliances">TV & Appliances</option>
                <option value="Mobile & Laptops">Mobile & Laptops</option>
                <option value="Electronic Ascessories">
                  Electronic Ascessories
                </option>
              </select>
            )}
            {catagory === "Garments & Fashion Product" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setSubCatagory(e.target.value)}
              >
                <option selected>Select product sub catagory</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids & Baby">Kids & Baby</option>
              </select>
            )}
            {catagory === "Sports, Books & more" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setSubCatagory(e.target.value)}
              >
                <option selected>Select product sub catagory</option>
                <option value="Sports, Books & more">
                  Sports, Books & more
                </option>
              </select>
            )}
          </div>
          <div className="mb-3 col-4">
            {subCatagory === "" && (
              <>
                <select
                  className="form-select form-select-lg"
                  aria-label=".form-select-lg example"
                  disabled
                  onChange={(e) => setProduct(e.target.value)}
                >
                  <option selected>Select product</option>
                </select>
                <p className="text-danger mb-0">
                  Please select product sub-catagory first
                </p>
              </>
            )}
            {subCatagory === "Electronic Ascessories" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="" selected>
                  Select Product
                </option>
                <option value="Electronic Ascessories">
                  Electronic Ascessories
                </option>
              </select>
            )}
            {subCatagory === "Mobile & Laptops" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="" selected>
                  Select Product
                </option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
              </select>
            )}
            {subCatagory === "TV & Appliances" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="" selected>
                  Select Product
                </option>
                <option value="TV">Television</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Air Conditioners">Air Conditioners</option>
                <option value="Refrigerators">Refrigerators</option>
                <option value="Kitchen Appliances">Kitchen Appliances</option>
              </select>
            )}
            {(subCatagory === "Men" || subCatagory === "Kids & Baby") && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="" selected>
                  Select Product
                </option>
                <option value="Footwear">Footwear</option>
                <option value="Watches ">Watches</option>
                <option value="Top Wear">Top Wear</option>
                <option value="Bottom Wear">Bottom Wear</option>
              </select>
            )}
            {subCatagory === "Women" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="" selected>
                  Select Product
                </option>
                <option value="Footwear">Footwear</option>
                <option value="Watches ">Watches</option>
                <option value="Ethnic Wear">Ethnic Wear</option>
                <option value="Ethnic Bottoms">Ethnic Bottoms</option>
              </select>
            )}
            {subCatagory === "Sports, Books & more" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="" selected>
                  Select Product
                </option>
                <option value="Toys">Toys</option>
                <option value="Books">Books</option>
                <option value="Sports Equipments">Sports Equipments</option>
              </select>
            )}
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="mb-3 col-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="brand" className="form-label">
              Brand Name
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter Brand Name"
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="mb-3 col-4">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="discount" className="form-label">
              Discount
            </label>
            <input
              type="number"
              className="form-control"
              id="discount"
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter Discount"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="text"
              className="form-control"
              id="rating"
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter ratings"
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="mb-3 col-4">
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="stock"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter Stock"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <input
              type="text"
              className="form-control"
              id="type"
              onChange={(e) => setType(e.target.value)}
              placeholder="Enter Product Type"
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="sizeOrWeight" className="form-label">
              Size / Weight
            </label>
            <input
              type="text"
              className="form-control"
              id="sizeOrWeight"
              onChange={(e) => setSizeOrWeight(e.target.value)}
              placeholder="Enter Size or Weight"
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="col-6">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
                id="image"
              />
            </div>
            <div className="col-4 m-auto">
              <img
                src={image ? URL.createObjectURL(image) : ""}
                className="rounded img-fluid"
              ></img>
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="mulImage" className="form-label">
              Multiple Image
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={multiImageHandler}
                id="mulImage"
              />
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {mulImage.map((v, i) => (
                <div
                  key={i}
                  onClick={() => {
                    const filterData = [...mulImage].filter(
                      (v, index) => index !== i
                    );
                    setMulImage([...filterData]);
                  }}
                  style={{ width: "60px", height: "60px" }}
                >
                  <img src={v} className="rounded img-fluid"></img>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const userData = token ? JSON.parse(token) : "";
  return {
    props: {
      token: userData.token
    },
  };
}

export default create;
