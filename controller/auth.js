import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Login = async (req, res) => {
  console.log(`Login request received`);
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid password or username");
      return res.status(400).json({ msg: "Invalid credentials" });
    } else {
      // const token = jwt.sign(
      //   { email: user.email },
      //   "secret_this_should_be_longer",
      //   { expiresIn: "24h" }
      // );
      console.log("User found");
      return res.status(200).json({ msg: "Login successful" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: err.message });
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    // sign a jwt with the user id and save it in the session

    await newUser.save();
    const token = jwt.sign({ email }, "secret_this_should_be_longer", {
      expiresIn: "24h",
    });
    return res.status(200).json({ msg: "User created successfully", token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: err.message });
  }
};

export const VerifyToken = (req, res, next) => {
  // verify a jwt token
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret_this_should_be_longer");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
