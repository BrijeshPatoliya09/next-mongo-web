import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcrypt"
import Cart from "../../models/Cart";

initDB();

export default async (req, res) => {
    const {username, email, password} = req.body;
    
    try{
        if(!username || !email || !password) {
            return res.status(422).json({error: "Please enter all fields"});
        }

        const userData = await User.findOne({email});
        if(userData) {
            return res.status(422).json({error: "user already exists with that email"});                
        }

       const hashedPassword =  await bcrypt.hash(password, 10);

       const newUser = await new User({
        username,
        email,
        password: hashedPassword
       }).save()

       await new Cart({user: newUser._id}).save();

       res.status(200).json({message: "user saved successfully"});    
    } catch(err) {
        console.log(err);
    }
}