const Article = require("../../../models/Article");

/*
    GET /api/article/:user_id/:node_id
*/

exports.read = (req, res) => {
  const count = (article) => {
    if (!article) {
      throw new Error("article not found");
    } else {
      return res.status(200).json({
        article,
      });
    }
  };
  const onError = (error) => {
    res.status(404).json({
      message: error.message,
    });
  };
  Article.findOneByUser_idNode_id(req.params.user_id, req.params.node_id)
    .then(count)
    .catch(onError);
};

/*
    POST /api/article
    {
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
    }
*/

exports.write = (req, res) => {};

/*
    PATCH /api/article/:nodeid
    {
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
    }
*/

exports.update = (req, res) => {};

/*
    DELETE /api/article/:user_id/:node_id
*/

exports.delete = (req, res) => {};
