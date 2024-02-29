const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose
  .connect(
    "mongodb+srv://maxesoflife:iL0V3TAx35@cluster0.3qrrynu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to mongoDB"));

mongoose.connection.on("error", (err) => {
  console.log(`${err.message}`);
});
