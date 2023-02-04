import express from "express";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// needed to see req.body?
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// override with POST having ?_method=DELETE
// needed to update products
import methodOverride from "method-override";
app.use(methodOverride("_method"));

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

// creating new products
app.get("/products/new", (req, res) => {
  res.render("new");
});

// submitting new product
app.post("/products", async (req, res) => {
  console.log(req);
  const newProduct = new Product(req.body);
  await newProduct.save();
  // console.log(newProduct);
  // res.send("making your product");
  res.redirect(`/products/${newProduct._id}`);
});

// show individual product
app.get("/products/:id", async (req, res) => {
  console.log(req);
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  console.log(product);
  res.render("show", { product });
});

// editing products
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  res.render("edit", { product });
});

// submitting the edited product
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// deleting a product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

// starting the server
app.listen(8080, () => {
  console.log("listening from port", 8080);
});
