import initDB from "../../helpers/initDB";
import Product from "../../models/Product";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProd(req, res);
      break;

    case "POST":
      await saveProd(req, res);
      break;

    case "PUT":
      await editProd(req, res);
      break;

    case "DELETE":
      await deleteProd(req, res);
      break;
  }
};

const getAllProd = async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      const products = await Product.find({
        seller: new mongoose.Types.ObjectId(userId),
      });
      return res.status(200).json(products);
    }
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
    ]);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const saveProd = async (req, res) => {
  const { name, price, image, description } = req.body;

  try {
    if (!name || !price || !image || !description) {
      return res.status(422).json({ msg: "Please add all the fields" });
    }

    const products = await Product(req.body).save();
    res.status(201).json(products);
  } catch (err) {
    console.log(err);
  }
};

const editProd = async (req, res) => {
  const { status, prodId } = req.body;

  try {
    if(req.body.id){
      const {productData, id} = req.body 
      await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true
      });
      return res.status(201).json({ message: "Product Updated Successfully" });
    }
    await Product.findByIdAndUpdate(prodId, { status });
    res.status(201).json({ message: "Status Changed Successfully" });
  } catch (err) {
    console.log(err);
  }
};

const deleteProd = async (req, res) => {
  const { body } = req;

  try {
    await Product.findByIdAndDelete(body);
    res.status(201).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
};
