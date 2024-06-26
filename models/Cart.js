import mongoose, { model, models, Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    products: [
        {
            quantity: {type: Number, default: 1},
            product: {type: ObjectId, ref: "product"}
        }
    ]
})

export default models.Cart || model("Cart", cartSchema);