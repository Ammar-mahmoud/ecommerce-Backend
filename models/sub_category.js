const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        trim: true, // add without spaces
        unique: [true,'subCategory must be unique'],
        minLength: [2, 'too short'],
        maxLength: [32, 'too long'],
    },
    slug: {
        type: String,
        lowercase: true,

    },
    category:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'Category', // foreign key
        required: [true,"subCategory must be belongs to category"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('subCategory', subCategorySchema);