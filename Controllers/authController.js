const User = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const generateToken = async function (user) {
  const token = jwt.sign({ _id: user._id }, `${process.env.SECRET}`, {
    expiresIn: 60 * 60,
  });
  return token;
};

exports.register = async function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    username = req.body.username;
    password = req.body.password;
    let user = await User.findOne({ username });
    if (user) {
      res.json({ success: false, msg: "Please make a different username." });
      return;
    }
    let newUser = new User({
      username: username,
      password: password,
    });
    const token = await generateToken(newUser);

    await newUser.save();
    newUser.password = "";
    res.json({
      success: true,
      msg: "Successful created new user.",
      newUser,
      token,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let user = await User.findOne({ username });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const token = await generateToken(user);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    user.password = "";
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json("user not found");
  }
};

exports.authCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user; //route hanlder now will not have to fetch the user account
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};
exports.protected = async (req, res) => {
  let user = req.user;
  user.password = "";
  try {
    res.json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};
