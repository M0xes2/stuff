const mongoose = require("mongoose");
const slugify = require("slugify");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a actual account dumbass",
  },
  slug: String,
  password: {
    type: String,
    trim: true,
    required: "Please enter a actual account dumbass",
  },
});

const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a actual name dumbass",
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: {
    type: [String],
    trim: true,
  },
});

pageSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slugify(this.name);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slugify(this.name);
  next();
});

module.exports.user = mongoose.model("User", userSchema);
module.exports.page = mongoose.model("Page", pageSchema);
