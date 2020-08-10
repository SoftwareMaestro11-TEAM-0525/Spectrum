const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema({
  user_id: {
    type: String,
    trim: true,
    index: true,
    required: true,
  },
  node_id: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: [experience, web_url, file_url, category],
  },
  title: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  content: {
    type: String,
  },
  keyword: {
    type: Array,
    default: [],
  },
  web_url: {
    type: String,
  },
  file_url: {
    type: String,
  },
  secret: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Article", Article);
