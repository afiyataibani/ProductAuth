const Category = require("../models/categorySchema");
const fs = require("fs");

module.exports.addCategoryPage = (req, res) => {
  return res.render("./pages/add_category");
};

module.exports.viewCategoryPage = async (req, res) => {
  try {
    const data = await Category.find();
    console.log(data);
    return res.render("./pages/view_category", { data });
  } catch (error) {
    console.log(error);
    return res.render("./pages/view_category", { data: [] });
  }
};

module.exports.addCategory = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    if (req.file) {
      req.body.image = req.file.path;
    }
    await Category.create(req.body);
    return res.redirect("/category/add_category");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.editCategoryPage = async(req,res)=>{
    try {
        let {id} = req.params
        let category = await Category.findById(id);
        console.log(category);
        return res.render('./pages/edit_category',{category})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.editCategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
      fs.unlinkSync(req.body.oldImage);
    }
    console.log(req.body, "\n from edit page", req.params.id);
    await Category.findByIdAndUpdate(req.params.id, req.body);
    // return res.json("Data update.");
    return res.redirect("/category/view_category");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    let deletedData = await Category.findByIdAndDelete(req.params.id);
    fs.unlinkSync(deletedData.image);
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
