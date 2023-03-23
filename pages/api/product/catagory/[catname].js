import initDB from "../../../../helpers/initDB";
import Product from "../../../../models/Product";

initDB();

export default async (req, res) => {
  const {
    method,
    body,
    query: { catname },
  } = req;
  const nextPage = (body - 1) * 10;

  try {
    if (body == 1) {
      const singleCatProd = await Product.find().limit(10);
      res.status(200).json(singleCatProd);
    } else {
      const singleCatProd = await Product.find().skip(nextPage).limit(10);
      res.status(200).json(singleCatProd);
    }
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
