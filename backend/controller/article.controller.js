const Article = require("../models/Article");

/*
    GET /api/article/:user_id/:node_id
*/

exports.read = (req, res) => {
  const count = (article) => {
    if (!article) throw new Error("article not found");
    else
      return res.status(200).json({
        article,
      });
  };

  Article.findOneByUser_idNode_id(req.params.user_id, req.params.node_id)
    .then(count)
    .catch((err) =>
      res.status(404).json({ success: false, messge: err.message })
    );
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

exports.write = (req, res) => {
  const respond = () => {
    res.status(200).json({ success: true });
  };
  Article.create(
    req.body.user_id,
    req.body.node_id,
    req.body.type,
    req.body.title,
    req.body.start_date,
    req.body.end_date,
    req.body.content,
    JSON.parse(req.body.keyword),
    req.body.web_url,
    req.body.file_url,
    req.body.secret
  )
    .then(respond)
    .catch((err) =>
      res.status(404).json({ success: false, messge: err.message })
    );
};

/*
    PATCH /api/article/:user_id/:node_id
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

exports.update = (req, res) => {
  const count = (article) => {
    if (!article) throw new Error("article not found");
    else
      return res.status(200).json({
        success: true,
        article,
      });
  };
  const onError = (error) => {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  };
  Article.update(
    req.params.user_id,
    req.params.node_id,
    req.body.type,
    req.body.title,
    req.body.start_date,
    req.body.end_date,
    req.body.content,
    JSON.parse(req.body.keyword),
    req.body.web_url,
    req.body.file_url,
    req.body.secret
  )
    .then(count)
    .catch(onError);
};

/*
    DELETE /api/article/:user_id/:node_id
*/

exports.delete = async (req, res) => {
  let = article = await Article.findOneByUser_idNode_id(
    req.params.user_id,
    req.params.node_id
  );
  if (article) {
    await Article.delete(req.params.user_id, req.params.node_id);
    return res.status(200).json({ success: true });
  } else
    return res
      .status(500)
      .json({ success: false, message: "article not found" });
};
