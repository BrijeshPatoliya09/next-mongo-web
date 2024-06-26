import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import initDB from "../../helpers/initDB";
import Paymenthistory from "../../models/PaymentHistory";
import Product from "../../models/Product";
import User from "../../models/User";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import baseUrl from "../../helpers/baseUrl";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        const { paymentData, proData } = body;
        await Paymenthistory(paymentData).save();
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: proData[0].productInfo.map((v) => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: v.name,
                },
                unit_amount: v.price * 100,
              },
              quantity: proData[0].products.filter(
                (filt) => filt.product === v._id
              )[0].quantity,
            };
          }),
          success_url: `${baseUrl}/cart`,
          cancel_url: `${baseUrl}/account`,
        });
        body.paymentData.products.map(async (val) => {
          await Product.findOneAndUpdate(
            { _id: val.product },
            {
              $inc: { stock: -val.quantity },
            }
          );
        });
        res.status(200).json({ message: "Payment made successfully", url: session.url });
      } catch (err) {
        console.log(err);
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
            orderHisData.products.map(async (v) => {
              const prodData = await Product.findById(v.product);
              const totalAmount =
                (prodData.price - (prodData.price * prodData.discount) / 100) *
                v.quantity;

              const sellerAmt = (
                totalAmount -
                (totalAmount * 10) / 100
              ).toFixed(2);
              await User.findOne(
                {
                  _id: prodData.seller,
                },
                (err, data) => {
                  if (!err) {
                    data.balance = Number(data.balance) + Number(sellerAmt);
                    data.save();
                  } else {
                    return res
                      .status(400)
                      .json({ error: "Something went wrong" });
                  }
                }
              );
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
