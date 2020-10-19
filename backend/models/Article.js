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
    unique: true,
  },
  type: {
    type: String,
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

Article.statics.findOneByUserIdNodeId = function (user_id, node_id) {
  return this.findOne({
    user_id,
    node_id,
  });
};

Article.statics.write = function (article) {
  return new this(article).save();
};

Article.statics.updateArticle = function (article) {
  return article.save();
};

Article.statics.delete = function (user_id, node_id) {
  return this.deleteOne({ user_id, node_id });
};

module.exports = mongoose.model("Article", Article);
