const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'brand required'],
        unique: [true, 'brand unique'],
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
  
const brandModel = mongoose.model("Brand", brandSchema);
  
module.exports = brandModel;