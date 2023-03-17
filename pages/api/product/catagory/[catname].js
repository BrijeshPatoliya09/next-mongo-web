import initDB from "../../../../helpers/initDB";
import Product from "../../../../models/Product";

initDB();

export default async (req, res) => {
    const {method, body, query: {catname}} = req
    switch(method) {
        case "GET":
            try {
                const singleCatProd = await Product.find();
                res.status(200).json(singleCatProd)
            } catch(err) {
                res.status(404).json({message: "Something went wrong"})
            }
         break;
    }
}