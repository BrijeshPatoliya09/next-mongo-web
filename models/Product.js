import mongoose, { model, models, Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId
const productSchema = new Schema({
    seller: {
        type: ObjectId,
        ref: "users",
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Inactive"
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    image: {
        type: String,
        required: true 
    },
    sideimage: {
        type: [String]
    },
    rating: {
        type: String
    },
    sizeorweight: {
        type: String
    },
    stock: {
        type: Number
    },
    catagory: {
        type: String,
        required: true
    },
    subcatagory: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    }
})

export default models.product || model('product', productSchema)