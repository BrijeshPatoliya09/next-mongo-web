import mongoose, { model, models, Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const paymentSchema = new Schema(
  {
    cardName: {
      type: String,
      required: true,
    },  
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
      default: "Pending",
    },
    orderNo: {
      type: String,
      required: true
    },
    totalPrice: {
      type: String,
      required: true
    },
    secrete: {
      type: String
    },
    qrCode: {
      type: String
    },
    products: [
      {
        quantity: { type: Number, default: 1 },
        product: { type: ObjectId, ref: "product" },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Paymenthistory || model("Paymenthistory", paymentSchema);
