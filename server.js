const express = require('express')
const app = express();
const path = require("path");
const {sequelize} = require("./models");
const { rootRouter } = require('./Router');
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);


const PORT = process.env.PORT || 6969;


const publicPath = path.join(__dirname, "./Public");
app.use("/Public", express.static(publicPath));

app.use("/api/v1", rootRouter)

app.listen(PORT, async () => {
  console.log(`server run on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connect database success!");
  } catch (error) {
    console.log("Connect database error!", error);
  }
})