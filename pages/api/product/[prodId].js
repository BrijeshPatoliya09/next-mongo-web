import initDB from "../../../helpers/initDB";
import Product from "../../../models/Product";

initDB();

export default async (req, res) => {
    switch(req.method) {
        case "GET":
            await getProduct(req, res);
         break;
         
         case "DELETE":
            await deleteProduct(req, res);
         break;
    }
}

const getProduct = async (req, res) => {
    const { prodId } = req.query;

    const product = await Product.findById(prodId);
    res.status(200).json(product);
}

const deleteProduct = async (req, res) => {
    const { prodId } = req.query;
    await Product.findByIdAndDelete(prodId);
    res.status(200).json({});
}