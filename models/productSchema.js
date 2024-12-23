const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    image: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("productsModel", productSchema);

module.exports = Product;
