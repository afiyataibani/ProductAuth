const categoryModel = require("../models/categorySchema");
const subCategoryModel = require("../models/subCategorySchema");
const Product = require("../models/productSchema");
const fs = require("fs");

module.exports.addProductPage = async (req, res) => {
  let categorys = await categoryModel.find();
  let subCategorys = await subCategoryModel.find();
  return res.render('./pages/add_product', {
      categorys, subCategorys
  });
}

module.exports.viewProductPage = async (req, res) => {
    try {
        let data = await Product.find({}).populate('categoryId').populate('subCategoryId')
        console.log(data);
        let findCat = null;
        // return res.json(products);
        return res.render('./pages/view_product', { data, findCat });
    } catch (error) {
        return res.json(error.message);
    }
}

module.exports.addProduct = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    if (req.file) {
      req.body.image = req.file.path;
    }
    await Product.create(req.body);
    return res.redirect("/product/add_product");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.editProductPage = async(req,res)=>{
    try {
        let {id} = req.params
        let product = await Product.findById(id);
        console.log(product);
        return res.render('./pages/edit_product',{product})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.editProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
      fs.unlinkSync(req.body.oldImage);
    }
    console.log(req.body, "\n from edit page", req.params.id);
    await Product.findByIdAndUpdate(req.params.id, req.body);
    // return res.json("Data update.");
    return res.redirect('/product/view_product');
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    let deletedData = await Product.findByIdAndDelete(req.params.id);
    // return res.json("Product Deleted..")
    fs.unlinkSync(deletedData.image);
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
