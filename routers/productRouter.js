const {Router} = require('express')
const productController = require('../controllers/productController')
const {uploadImage} = require('../middlewares/uploadImage')

const productRouter = Router();

productRouter.get('/add_product',productController.addProductPage);
productRouter.post('/add_product',uploadImage, productController.addProduct);

productRouter.get('/view_product',productController.viewProductPage);
productRouter.get('/edit_product/:id',productController.editProductPage);

productRouter.post('/edit_product/:id', uploadImage,productController.editProduct);

productRouter.get('/delete_product/:id',productController.deleteProduct);

module.exports = productRouter;

