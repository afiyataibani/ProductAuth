const {Router} = require('express')
const subCategoryController = require('../controllers/subCategoryController')
const {uploadImage} = require('../middlewares/uploadImage')

const subCategoryRouter = Router();

subCategoryRouter.get('/add_subCategory',subCategoryController.addSubCategoryPage);
subCategoryRouter.post('/add_subCategory',uploadImage, subCategoryController.addSubCategory);

subCategoryRouter.get('/view_subCategory',subCategoryController.viewSubCategoryPage);
subCategoryRouter.get('/edit_subCategory/:id',subCategoryController.editSubCategoryPage);

subCategoryRouter.post('/edit_subCategory/:id', uploadImage,subCategoryController.editSubCategory);

subCategoryRouter.get('/delete_subCategory/:id',subCategoryController.deleteSubCategory);

module.exports = subCategoryRouter;

