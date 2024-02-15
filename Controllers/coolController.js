const {ObjectId} = require("mongodb")
const Page = require("../Models/stuff")

exports.homePage = (req, res) => {
    const data = ["super", "cool", "BALLER"];
    try {
        res.json(data);
    }
    catch (error) {}
}

exports.middlewareSample = (req, res, next)=>{
    req.name = "TEST"; //runs before res
    next(); //cues next step of res (refer to index.js)
}

exports.authMiddlewareSample = (req, res, next)=>{
    if (req.body.user) {
        next();
    }
    else {
        res.json("You is a special");
    }
}

exports.createPage = async (req, res) => {
    try {
        const page = new Page(req.body)
        await page.save();
        res.json(`Congrats! You've done clapped the pages ${page}`);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}