const express = require("express");
const router = new express.Router();

router.get("/", (req,res)=>{
    try {
        return res.send("Router? I hardly know her!")
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;