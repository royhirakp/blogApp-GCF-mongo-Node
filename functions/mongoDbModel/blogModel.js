const mongoose = require("mongoose");

const BlogSchma = mongoose.Schema({
  title: { type: String, require: true, unique: true, trim: true },
  content: { type: String, require: true, trim: true },
  author: { type: String, require: true, trim: true },
  PublicationDate: { type: String, require: true, trim: true },
});
const blogModel = mongoose.model("blog", BlogSchma);
module.exports = blogModel;
