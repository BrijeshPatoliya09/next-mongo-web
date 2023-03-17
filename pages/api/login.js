import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

initDB();

export default async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const pswMatch = await bcrypt.compare(password, user.password);

    if (pswMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { username, role, email } = user;
      return res.status(201).json({ token, user: { username, role, email } });
    } else {
      return res.status(401).json({ error: "email or password doesn't match" });
    }
  } catch (err) {
    console.log(err);
  }
};
