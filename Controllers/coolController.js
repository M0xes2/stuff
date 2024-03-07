const { ObjectId } = require("mongodb");
const User = require("../Models/userSchema");
const Page = require("../Models/stuff");

exports.homePage = (req, res) => {
  res.json(`Welcome!`);
};

//add proper auth (check if user and pass match)
exports.authMiddleware = async (req, res, next) => {
  try {
    const inputuser = new User(req.body);
    const user_acc = await User.findOne(inputuser.name);
    if (!user_acc) {
      res.json(`Incorrect Username`)
    }
    req.username = " " + user.name;
    next();
  } catch (error) {
    console.log(error);
    res.json("Please enter valid account details.");
  }
};

exports.createAccount = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(`Welcome ${user.username}!`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.json(`Congrats! You've done clapped the pages ${page}`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (page[update] = req.body[update]));
    await page.save();
    res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getPages = async (req, res) => {
  try {
    const Pages = await Page.find().limit(2);
    res.json(Pages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(`${user.name} was deleted!`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      res.status(404).send();
    }
    res.send(`${page.name} was deleted!`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
