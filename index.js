const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const product = require("./routes/product");
const app = express();

app.use(express.json({}));
app.use(
  express.json({
    extended: true,
  })
);
// use dotenv files
dotenv.config({
  path: "./config/config.env",
});

connectDB();

app.use("/api/product", product);
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running mode on port ${PORT}`));
