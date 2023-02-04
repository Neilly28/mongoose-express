import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["fruit", "veggie", "dairy"],
  },
});

export const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
// export default Product;
