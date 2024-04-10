const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category unique'],
        minLength:[3,'too short'],
        maxLength: [32, 'too long'],

    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,
    

},
{timestamps: true} // two fields created at , updated at lasts updated
);
  
const categoryModel = mongoose.model("Category", categorySchema);
  
module.exports = categoryModel;