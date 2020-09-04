import Article from "../models/Article";

export class ArticleService {
  static read = async (req) => {
    const { user_id, node_id } = req;

    const existed = await Article.findOneByUserIdNodeId(user_id, node_id);

    if (existed == null) {
      let err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }

    return existed;
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

    return await Article.write(article);
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

    return await Article.update(params, body);
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

    return await Article.delete(req.user_id, req.node_id);
  };
}
