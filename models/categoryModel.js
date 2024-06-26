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

const setImageName = (doc)=>{
    if(doc.image){
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
}

// create
categorySchema.post('save', (doc)=>{
    setImageName(doc);
})


// find all categories, find one , update
categorySchema.post('init', (doc)=>{
    setImageName(doc)
})

const categoryModel = mongoose.model("Category", categorySchema);
  
module.exports = categoryModel;