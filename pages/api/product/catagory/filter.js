import initDB from "../../../../helpers/initDB";
import Product from "../../../../models/Product";

initDB();

export default async (req, res) => {
  try {
    const {
      method,
      body: {
        prodBrandCheck,
        prodCheck,
        prodRating,
        prodPrice,
        prodTypeCheck,
        prodSizeCheck,
        prodDiscount,
      },
    } = req;

    const filterField = {
      product: prodCheck,
    };

    if (prodBrandCheck.length > 0) {
      filterField.brand = {};
      filterField.brand.$in = prodBrandCheck;
    }
    if (prodTypeCheck.length > 0) {
      filterField.type = {};
      filterField.type.$in = prodTypeCheck;
    }
    if (prodSizeCheck.length > 0) {
      filterField.sizeorweight = {};
      filterField.sizeorweight.$in = prodSizeCheck;
    }
    if (prodRating.length > 0) {
      filterField.rating = {};
      filterField.rating.$gte = Math.max.apply(Math, prodRating);
    }
    if (prodDiscount.length > 0) {
      filterField.discount = {};
      filterField.discount.$gte = Math.max.apply(Math, prodDiscount);
    }
    if (prodPrice.max !== "1500+") {
      filterField.price = {};
      filterField.price.$gt = Number(prodPrice.min);
      filterField.price.$lt = Number(prodPrice.max);
    } else {
      filterField.price = {};
      filterField.price.$gt = Number(prodPrice.min);
    }
    console.log(filterField);

    const singleCatProd = await Product.find(filterField);
    res.status(200).json(singleCatProd);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Something went wrong" });
  }
};
