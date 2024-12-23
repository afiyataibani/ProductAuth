const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'category'
    } ,
    subCategory: {
        type: String,
        required: true
    },
    image: String
})

const subCategoryModel = mongoose.model('subCategory', subCategorySchema);

module.exports = subCategoryModel;