import Article from "../models/Article";

export class ArticleService {
  static read = async (req) => {
    const { user_id, node_id } = req;
    const pre = node_id.split(",");
    let res = [];
    for (var idx in pre) {
      const tmp = await Article.findOneByUserIdNodeId(user_id, pre[idx]);
      if (tmp != null) {
        await res.push(tmp.content);
      }
    }

    if (res.length == 0) {
      let err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }

    return res;
  };

  static write = async (req) => {
    const article = req;

    const existed = await Article.findOneByUserIdNodeId(
      article.user_id,
      article.node_id
    );

    if (existed != null) {
      let err = new Error();
      err.message = "Article user_id node_id is Duplicate";
      err.status = 400;
      throw err;
    }

    try {
      return await Article.write(article);
    } catch (err) {
      err.message = "Article write fail";
      err.status = 500;
      throw err;
    }
  };

  static update = async (req) => {
    const params = req.params;
    const body = req.body;

    const existed = await Article.findOneByUserIdNodeId(
      params.user_id,
      params.node_id
    );

    if (existed == null) {
      let err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }

    try {
      return await Article.update(params, body);
    } catch (err) {
      err.message = "Article update fail";
      err.status = 500;
      throw err;
    }
  };

  static delete = async (req) => {
    const existed = await Article.findOneByUserIdNodeId(
      req.user_id,
      req.node_id
    );

    if (existed == null) {
      let err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }

    try {
      return await Article.delete(req.user_id, req.node_id);
    } catch (err) {
      err.message = "Article delete fail";
      err.status = 500;
      throw err;
    }
  };
}
