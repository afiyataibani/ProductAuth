const categoryModel = require("../models/categorySchema");
const subCategoryModel = require("../models/subCategorySchema");
const fs = require("fs");

module.exports.addSubCategoryPage = async (req, res) => {
    let categorys = await categoryModel.find();
    return res.render('./pages/add_subCategory', { categorys });
}

module.exports.viewSubCategoryPage = async (req, res) => {
    try {
      let data = await subCategoryModel.find({}).populate('categoryId');
      return res.render("./pages/view_subCategory", { data });
    } catch (error) {
      console.log(error);
      return res.render("./pages/view_subCategory", { data });
    }
  };

module.exports.addSubCategory = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    if (req.file) {
      req.body.image = req.file.path;
    }
    await subCategoryModel.create(req.body);
    return res.redirect("/subCategory/add_subCategory");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.editSubCategoryPage = async (req, res) => {
  try {
    const { id } = req.params;  
    let data = await subCategoryModel.findById(id);      
    return res.render('./pages/edit_subCategory', { data });
  } catch (error) {
    console.log(error);
    return res.redirect(req.get('Referrer') || '/');
  }
};

module.exports.editSubCategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
      fs.unlinkSync(req.body.oldImage);
    }
    console.log(req.body, "\n from edit page", req.params.id);
    await subCategoryModel.findByIdAndUpdate(req.params.id, req.body);
    // return res.json("Data update.");
    return res.redirect('/subCategory/view_subCategory');
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.deleteSubCategory = async (req, res) => {
  try {
    let deletedData = await subCategoryModel.findByIdAndDelete(req.params.id);
    fs.unlinkSync(deletedData.image);
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
