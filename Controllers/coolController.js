const { ObjectId } = require("mongodb");
const User = require("../Models/userSchema");
const Page = require("../Models/stuff");
const path = require("path");

exports.homePage = (req, res) => {
  res.json(`Welcome!`);
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
    try {
      page.photo = req.file.path;
    } catch (e) {
      console.log("No image");
    }

    await page.save();
    res.json(page);
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

exports.getPage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      res.status(404).send();
    }
    res.json(page);
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
    res.json(`${page.name} was deleted!`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
