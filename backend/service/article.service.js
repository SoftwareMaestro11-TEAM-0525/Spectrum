import Article from "../models/Article";
import User from "../models/User";
import axios from "axios";
export class ArticleService {
  static readArticle = async (req) => {
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

  static readArticles = async (req) => {
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

  static readArticlesContent = async (req) => {
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

  static readAllContent = async (req) => {
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

  static readAllContentByUserId = async (req) => {
    const { user_id, newContent } = req;
    const userExsited = await User.findOneByUserId(user_id);

    if (userExsited == null) {
      let err = new Error();
      err.message = "User not Found";
      err.status = 400;
      throw err;
    }

    const tmp = await Article.findAllByUserId(user_id);
    const res = {
      node_id: [],
      content: [],
    };

    if (tmp == null) {
      let err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }
    for (let element of tmp) {
      res.node_id.push(element.node_id);
      res.content.push(element.content);
    }
    return res;
  };

  static readTimeline = async (req) => {
    const user_id = req;
    const existed = await Article.findTimelineArticles(user_id);

    if (existed == null) {
      let err = new Error();
      err.message = "Articles NOT FOUND";
      err.status = 400;
      throw err;
    }

    const result = [];
    existed.forEach((element) => {
      if (element.type == "experience" && element.start_date != null)
        result.push({
          title: element.title,
          start_date: element.start_date,
          content: element.content,
        });
    });

    if (result.length == 0) {
      let err = new Error();
      err.message = "Articles Not Found";
      err.status = 400;
      console.log(err);
      throw err;
    }
    return result;
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

    let existed = await Article.findOneByUserIdNodeId(
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
      var article = Object.assign(existed, req.body);
      return await Article.updateArticle(article);
    } catch (err) {
      err.message = "Article update fail";
      err.status = 500;
      throw err;
    }
  };

  static updateFileUrl = async (req) => {
    const body = req.body;
    const file = req.file;

    let existed = await Article.findOneByUserIdNodeId(
      body.user_id,
      body.node_id
    );

    if (existed == null) {
      let err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }

    try {
      var article = Object.assign(existed, { file_url: file.location });
      return await Article.updateArticle(article);
    } catch (err) {
      err.message = "Article update fail";
      err.status = 500;
      throw err;
    }
  };

  static deleteFileUrl = async (req) => {
    const params = req.params;

    let existed = await Article.findOneByUserIdNodeId(
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
      var article = Object.assign(existed, { file_url: "" });
      return await Article.updateArticle(article);
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
