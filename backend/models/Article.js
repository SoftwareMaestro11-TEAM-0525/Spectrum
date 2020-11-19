const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Article = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  node_id: {
    type: String,
    required: true,
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

Article.statics.findAllByUserId = function (user_id) {
  return this.find({ user_id, type: "experience" }).select({
    type: 0,
    keyword: 0,
    user_id: 0,
    start_date: 0,
    end_date: 0,
    web_url: 0,
    secret: 0,
    file_url: 0,
  });
};

Article.statics.findTimelineArticles = function (user_id) {
  return this.find({
    user_id,
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
