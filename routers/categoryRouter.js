const {Router} = require('express')
const categoryController = require('../controllers/categoryController')
const {uploadImage} = require('../middlewares/uploadImage')

const categoryRouter = Router();

categoryRouter.get('/add_category',categoryController.addCategoryPage);
categoryRouter.post('/add_category',uploadImage, categoryController.addCategory);

categoryRouter.get('/view_category',categoryController.viewCategoryPage);
categoryRouter.get('/edit_category/:id',categoryController.editCategoryPage);

categoryRouter.post('/edit_category/:id', uploadImage,categoryController.editCategory);

categoryRouter.get('/delete_category/:id',categoryController.deleteCategory);

module.exports = categoryRouter;

