const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Share = new Schema({
  type: {
    type: String,
    enum: ["mindmap", "article"],
    default: "mindmap",
  },
  share_key: {
    type: String,
    trim: true,
    index: true,
    required: true,
  },
  user_id: {
    type: String,
    trim: true,
    index: true,
    required: true,
  },
  node_id: {
    type: String,
    index: true,
    unique: true,
  },
  created_date: {
    type: String,
  },
  expired_date: {
    type: String,
  },
  hit: {
    type: Number,
  },
});

Share.statics.findOneByShareKey = function (share_key) {
  return this.findOne({
    share_key,
  });
};

Share.statics.findOneByUserId = function (type, user_id) {
  return this.findOne({
    type,
    user_id,
  });
};

Share.statics.createShare = function (share) {
  return new this(share).save();
};

Share.statics.deleteShare = function (type, share_key) {
  return this.deleteOne({
    type,
    share_key,
  });
};
// Article.statics.write = function (article) {
//   console.log(article);
//   return new this(article).save();
// };

// Article.statics.updateArticle = function (article) {
//   return article.save();
// };

// Article.statics.delete = function (user_id, node_id) {
//   return this.deleteOne({ user_id, node_id });
// };

module.exports = mongoose.model("Share", Share);
