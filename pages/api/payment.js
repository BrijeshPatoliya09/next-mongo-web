import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import initDB from "../../helpers/initDB";
import Paymenthistory from "../../models/PaymentHistory";
import Product from "../../models/Product";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

initDB();

export default async (req, res) => {
  const { method, body } = req;
  const { authorization } = req.headers;

  switch (method) {
    case "GET":
      try {
        if (authorization) {
          const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
          const payHistory = await Paymenthistory.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
              $lookup: {
                from: "products",
                localField: "products.product",
                foreignField: "_id",
                as: "productInfo",
              },
            },
          ]);
          return res.status(200).json(payHistory);
        }

        const orderHistory = await Paymenthistory.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userInfo",
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "products.product",
              foreignField: "_id",
              as: "productInfo",
            },
          },
        ]);
        return res.status(200).json(orderHistory);
      } catch (err) {
        res.status(404).json({ status: "404", error: "you must logged in" });
      }
      break;

    case "POST":
      try {
        await Paymenthistory(body).save();
        body.products.map(async (val) => {
          await Product.findOneAndUpdate({ _id: val.product }, {
            $inc: {stock: -val.quantity}
          });
        });
        res.status(200).json({ message: "Payment made successfully" });
      } catch (err) {
        return res.status(404).json({ error: "you must logged in" });
      }
      break;

    case "PUT":
      try {
        if (body.qrToken) {
          const { orderHisId, qrToken } = body;
          const orderHisData = await Paymenthistory.findById(orderHisId);

          const verify = speakeasy.totp.verify({
            secret: orderHisData.secrete,
            token: qrToken,
            encoding: "base32",
          });

          if (verify) {
            await Paymenthistory.findByIdAndUpdate(orderHisId, {
              delivery: "Delivered Successfully",
            });
            return res.status(200).json({ message: "Oreder verified" });
          }
          return res.status(404).json({ message: "not verified" });
        }

        const tem_secret = speakeasy.generateSecret();
        qrcode.toDataURL(tem_secret.otpauth_url, async (err, data) => {
          await Paymenthistory.findByIdAndUpdate(body, {
            delivery: "Shipped",
            qrCode: data,
            secrete: tem_secret.base32,
          }); 
        });
        res.status(200).json({ message: "Order will be Departed" });
      } catch (err) {
        console.log(err);
        return res.status(404).json({ error: "you must logged in" });
      }
      break;
  }
};
