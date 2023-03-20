import initDB from "../../helpers/initDB";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

initDB();

export default async (req, res) => {
  const { method, body } = req;
  const { authorization } = req.headers;
  switch (method) {
    case "GET":
      try {
        if (authorization) {
          const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
          const userData = await User.findById(userId);
          res.status(200).json(userData);
        }
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        console.log(err);
      }
      break;

    case "POST":
      try {
        const { userId, role } = body;
        await User.findByIdAndUpdate(userId, { role });
        res.status(200).json({ message: "Role Changed SuccessFully" });
      } catch (err) {
        console.log(err);
      }
      break;

    case "PUT":
      try {
        const { userId, username, email, newPassword, oldPassword } = body;
        if (newPassword && oldPassword) {
          const user = await User.findById(userId);
          const pswMatch = await bcrypt.compare(oldPassword, user.password);
          if (pswMatch) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findByIdAndUpdate(userId, {
              username,
              email,
              password: hashedPassword,
            });
            return res
              .status(200)
              .json({ message: "Edit user & password SuccessFully" });
          }
          return res.status(401).json({ error: "Wrong Password" });
        } else {
          await User.findByIdAndUpdate(userId, { username, email });
          return res.status(200).json({ message: "Edit user SuccessFully" });
        }
      } catch (err) {
        console.log(err);
      }
      break;

    case "DELETE":
      try {
        await User.findByIdAndDelete(body);
        res.status(200).json({ message: "User Deleted SuccessFully" });
      } catch (err) {
        console.log(err);
      }
      break;
  }
};
