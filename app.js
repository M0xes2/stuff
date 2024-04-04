const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
let corsOptions ={
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
require("./DB/mongoose");
const routes = require("./Routes/index");
app.use(express.json());
app.use(express.urlencoded());

app.use("/", routes);
app.listen(port, () => {
  console.log(`Well we ballin on ${port}`);
});
