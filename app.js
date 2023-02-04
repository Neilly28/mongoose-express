import express from "express";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

import mongoose from "mongoose";
mongoose.set("strictQuery", true);

import { Product } from "./models/product.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/happyFarm")
  .then(() => {
    console.log("Mongo connection open!");
  })
  .catch((err) => {
    console.log("oh no Mongo error!");
    console.log(err);
  });

// starting the server
app.listen(8080, () => {
  console.log("listening from port", 8080);
});

// routes
app.get("/", (req, res) => {
  res.render("home");
});

// index routes to see all products
app.get("/products", async (req, res) => {
  const products = await Product.find({}).lean();
  console.log(products[0]._id);
  res.render("products", { products });
});

// show individual product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  console.log(product);
  res.render("show", { product });
});
