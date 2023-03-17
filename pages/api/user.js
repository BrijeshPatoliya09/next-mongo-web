import initDB from "../../helpers/initDB";
import User from "../../models/User";

initDB();

export default async (req, res) => {
    const {method, body} = req
  switch (method) {
    case "GET":
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        console.log(err);
      }
      break;

    case "POST":
      try {
        const {userId, role} = body
        await User.findByIdAndUpdate(userId, {role});
        res.status(200).json({message: "Role Changed SuccessFully"});
      } catch (err) {
        console.log(err);
      }
      break;

      case "DELETE":
        try {
          await User.findByIdAndDelete(body);
          res.status(200).json({message: "User Deleted SuccessFully"});
        } catch (err) {
          console.log(err);
        }
        break;
  }
};
