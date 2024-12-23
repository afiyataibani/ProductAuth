const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    image : String    
})

const categoryModel = mongoose.model('category',categorySchema);

module.exports = categoryModel;