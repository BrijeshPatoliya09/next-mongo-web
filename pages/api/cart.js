import jwt from "jsonwebtoken"; 
import mongoose from "mongoose";
import initDB from "../../helpers/initDB";
import Cart from "../../models/Cart";

initDB();

export default async (req, res) => {
  const { authorization } = req.headers;
  const { method, body } = req;

  if (!authorization) {
    return res.status(401).json({ error: "you must logged in" });
  }

  switch (method) {
    case "GET":
      try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        const cart = await Cart.aggregate([
          { $match: { user: new mongoose.Types.ObjectId(userId) } },
          {
            $lookup: {
              from: "products",
              localField: "products.product",
              foreignField: "_id",
              as: "productInfo",
            },
          },
        ]);
        res.status(200).json(cart);
      } catch (err) {
        return res
          .status(404)
          .json({ status: "404", error: "you must logged in" });
      }
      break;

      case "POST":
        try {
          const { qty, productId } = body;
          const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
          const cart = await Cart.findOneAndUpdate({ user: userId, "products.product": productId },{"products.$.quantity": qty});

          res.status(200).json({ message: "Product added to cart", cart});
        } catch (err) {
          console.log(err);
          return res.status(404).json({ error: "you must logged in" });
        }
        break;

    case "PUT":
      try {
        const { quantity, productId } = body;
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        const cart = await Cart.findOne({ user: userId });
        const productExists = cart.products.some(
          (v) => v.product.toString() === productId
        );
        if (productExists) {
          await Cart.findOneAndUpdate(
            { user: userId, "products.product": productId },
            { $inc: { "products.$.quantity": quantity } }
          );
        } else {
          await Cart.findOneAndUpdate(
            { user: userId },
            {
              $push: { products: { quantity, product: productId } },
            }
          );
        }

        res.status(200).json({ message: "Product added to cart" });
      } catch (err) {
        console.log(err);
        return res.status(404).json({ error: "you must logged in" });
      }
      break;

    case "DELETE":
      try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        await Cart.findOneAndUpdate(
          {
            user: userId,
          },
          {
            $pull: { products: { product: body } },
          },
          {
            upsert: false,
            multi: true,
          }
        );
        res.status(200).json({ message: "Product Deleted Sucessfully" });
      } catch (err) {
        return res.status(404).json({ error: "you must logged in" });
      }
      break;
  }
};
