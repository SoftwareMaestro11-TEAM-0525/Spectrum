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
    enum: ["experience", "web_url", "file_url", "category"],
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
  const newArticle = new this({
    user_id:article.user_id,
    node_id:article.node_id,
    type:article.type,
    title:article.title,
    start_date:article.start_date,
    end_date:article.end_date,
    content:article.content,
    keyword:article.keyword,
    web_url:article.web_url,
    file_url:article.file_url,
    secret:article.secret,
  });

  return newArticle.save();
};

Article.statics.update = function (
  user_id,
  node_id,
  type,
  title,
  start_date,
  end_date,
  content,
  keyword,
  web_url,
  file_url,
  secret
) {
  return this.findOneAndUpdate(
    { user_id, node_id },
    {
      type,
      title,
      start_date,
      end_date,
      content,
      keyword,
      web_url,
      file_url,
      secret,
    },
    { returnNewDocument: true }
  );
};

Article.statics.delete = function (user_id, node_id) {
  return this.deleteOne({ user_id, node_id });
};

module.exports = mongoose.model("Article", Article);
