import { User } from "../../Models/userModel.js";
import { handleValidationErrors } from "../errorHandlers/userValidationError.js";
import { createToken, maxAge } from "../jwt/createToken.js";

const userLoginPost = async (req, res) => {
  try {
    const { email, password } = req.body.userDetails;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleValidationErrors(error);
    res.status(400).json({ errors });
  }
};
const userSignUpPost = async (req, res) => {
  const obj = req.body.userDetails;
  try {
    const user = new User(obj);
    const newUserMessage = await user.save();
    const token = createToken(newUserMessage._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(201).json({ user: newUserMessage._id });
  } catch (error) {
    const errors = handleValidationErrors(error);
    console.log(errors);
    res.status(400).json({ errors });
  }
};
const secretPage = async (req, res) => {
  const user = res.locals.user;
  res.status(401).send(`super secret stuff for ${user}`);
};
const logoutGet = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
    res.send("logged out succesfully");
  } catch (error) {
    console.log(error.message);
  }
};

export { userLoginPost, userSignUpPost, secretPage };
