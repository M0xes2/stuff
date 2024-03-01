const mongoose = require("mongoose")
require("dotenv").config({path:" variables.env "})
mongoose.connect(`mongodb+srv://maxesoflife:CFYcSjqtCiELGzZK@cluster0.u4ah7bh.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("connected to DB"));

mongoose.connection.on("error", (err) =>{
    console.log(`${err.message}`)
});
