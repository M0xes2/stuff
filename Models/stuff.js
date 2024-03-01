const mongoose = require("mongoose")
const slugify = require("slugify")
const coolSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: "Please enter a actual name dumbass"
    },
    slug: String,
    description:{
        type: String,
        trim: true
    },
    tags:{
        type: [String],
        trim: true
    }
});

coolSchema.pre('save', function(next){
    if(!this.isModified('name')){
        next();
        return;
    }
    this.slug = slugify(this.name);
    next();
})
module.exports = mongoose.model("Page", coolSchema)