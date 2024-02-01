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