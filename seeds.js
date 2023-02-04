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

// Product.create({
//   name: "Ruby Grapes",
//   price: 1.99,
//   category: "fruit",
// })
//   .then(() => {
//     console.log("new product created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const seedProducts = [
  {
    name: "Eggplant",
    price: 1.99,
    category: "veggie",
  },
  {
    name: "Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Eggs",
    price: 2.99,
    category: "dairy",
  },
];

console.log(seedProducts);

Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
