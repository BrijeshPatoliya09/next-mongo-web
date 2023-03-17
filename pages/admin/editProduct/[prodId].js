import { useRouter } from "next/router";
import React, { useState } from "react";
import baseUrl from "../../../helpers/baseUrl";

const EditProduct = ({ prodData }) => {
  const [name, setName] = useState(prodData.name);
  const [brand, setBrandName] = useState(prodData.brand);
  const [price, setPrice] = useState(prodData.price);
  const [discount, setDiscount] = useState(prodData.discount);
  const [rating, setRating] = useState(prodData.rating);
  const [type, setType] = useState(prodData.type);
  const [sizeOrWeight, setSizeOrWeight] = useState(prodData.sizeorweight);
  const [description, setDescription] = useState(prodData.description);
  const [image, setImage] = useState(prodData.image);
  const [mulImage, setMulImage] = useState(prodData.sideimage);
  const [catagory, setCatagory] = useState(prodData.catagory);
  const [subCatagory, setSubCatagory] = useState(prodData.subcatagory);
  const [stock, setStock] = useState(prodData.stock);
  const [product, setProduct] = useState(prodData.product);

  const [imgFileType, setImgFileType] = useState(false)

  const router = useRouter()

  const submitHandler = async (e) => {
    e.preventDefault();
    const img = await imageUpload();
    const productData = {
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
      seller: prodData.seller,
    };

    const res = await fetch(`${baseUrl}/api/products`, {
      method: "PUT",
      body: JSON.stringify({productData, id: prodData._id}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if(data.message){
      router.push("/admin/productList")
    }
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
              <option value="" selected={catagory == ""}>
                Select Product Catagor
              </option>
              <option value="Electronics Product" selected={catagory == "Electronics Product"}>Electronics Product</option>
              <option value="Garments & Fashion Product" selected={catagory == "Garments & Fashion Product"}>
                Garments & Fashion Product
              </option>
              <option value="Sports, Books & more" selected={catagory == "Sports, Books & more"}>Sports, Books & more</option>
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
                <option value="TV & Appliances" selected={subCatagory == "TV & Appliances"}>TV & Appliances</option>
                <option value="Mobile & Laptops" selected={subCatagory == "Mobile & Laptops"}>Mobile & Laptops</option>
                <option value="Electronic Ascessories" selected={subCatagory == "Electronic Ascessories"}>
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
                <option value="Men" selected={subCatagory == "Men"}>Men</option>
                <option value="Women" selected={subCatagory == "Women"}>Women</option>
                <option value="Kids & Baby" selected={subCatagory == "Kids & Baby"}>Kids & Baby</option>
              </select>
            )}
            {catagory === "Sports, Books & more" && (
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) => setSubCatagory(e.target.value)}
              >
                <option selected>Select product sub catagory</option>
                <option value="Sports, Books & more" selected={subCatagory == "Sports, Books & more"}>
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
                <option value="Electronic Ascessories" selected={product == "Electronic Ascessories"}>
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
                <option value="Mobile" selected={product == "Mobile"}>Mobile</option>
                <option value="Laptop" selected={product == "Laptop"}>Laptop</option>
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
                <option value="TV" selected={product == "TV"}>Television</option>
                <option value="Washing Machine" selected={product == "Washing Machine"}>Washing Machine</option>
                <option value="Air Conditioners" selected={product == "Air Conditioners"}>Air Conditioners</option>
                <option value="Refrigerators" selected={product == "Refrigerators"}>Refrigerators</option>
                <option value="Kitchen Appliances" selected={product == "Kitchen Appliances"}>Kitchen Appliances</option>
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
                <option value="Footwear" selected={product == "Footwear"}>Footwear</option>
                <option value="Watches" selected={product == "Watches"}>Watches</option>
                <option value="Top Wear" selected={product == "Top Wear"}>Top Wear</option>
                <option value="Bottom Wear" selected={product == "Bottom Wear"}>Bottom Wear</option>
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
                <option value="Footwear" selected={product == "Footwear"}>Footwear</option>
                <option value="Watches" selected={product == "Watches"}>Watches</option>
                <option value="Ethnic Wear" selected={product == "Ethnic Wear"}>Ethnic Wear</option>
                <option value="Ethnic Bottoms" selected={product == "Ethnic Bottoms"}>Ethnic Bottoms</option>
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
                <option value="Toys" selected={product == "Toys"}>Toys</option>
                <option value="Books" selected={product == "Books"}>Books</option>
                <option value="Sports Equipments" selected={product == "Sports Equipments"}>Sports Equipments</option>
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
              value={name}
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
              value={brand}
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
              value={price}
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
              value={discount}
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
              value={rating}
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
              value={stock}
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
              value={type}
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
              value={sizeOrWeight}
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
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImgFileType(true)
                }}
                id="image"
              />
            </div>
            <div className="col-4 m-auto">
              <img src={image ? !imgFileType ? image : URL.createObjectURL(image) : "" } className="rounded img-fluid"></img>
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
            value={description}
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
  const id = ctx.query.prodId;

  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: {
      prodData: data,
    },
  };
}

export default EditProduct;
