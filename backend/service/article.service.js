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

  static readArticlesContentByUserIdForRecommend = async (req) => {
    const { user_id, newContent } = req;

    const tmp = await Article.findAllByUserId(user_id);
    const res = {
      node_id: [],
      content: [],
    };

    if (tmp == null) {
      var err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }
    for (let element of tmp) {
      res.node_id.push(element.node_id);
      res.content.push(element.content);
    }
    console.log({
      res,
      newContent,
    });
    try {
      const result = await axios.post("http://nginx/ml/recommend/position", {
        res,
        newContent,
      });
      return result.data;
    } catch (err) {
      err.message = "run recomment fail";
      err.status = 400;
      throw err;
    }
  };

  static readArticlesContentByUserIdForKeyword = async (req) => {
    const { user_id } = req;

    const tmp = await Article.findAllByUserId(user_id);
    const content = [];

    if (tmp == null) {
      var err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }
    for (let element of tmp) {
      content.push(element.title);
      content.push(element.keyword);
      content.push(element.content);
    }

    console.log({
      content,
    });

    try {
      const result = await axios.post("http://nginx/ml/keyword", {
        content,
      });
      return result.data;
    } catch (err) {
      err.message = "run recomment fail";
      err.status = 400;
      throw err;
    }
  };

  static readArticlesContentByUserIdForSentence = async (req) => {
    const { user_id } = req;

    const tmp = await Article.findAllByUserId(user_id);
    const content = [];

    if (tmp == null) {
      var err = new Error();
      err.message = "Article not Found";
      err.status = 400;
      throw err;
    }
    for (let element of tmp) {
      content.push(element.title);
      content.push(element.content);
    }
    console.log(content);
    try {
      const result = await axios.post("http://nginx/ml/sentence", {
        content,
      });
      return result.data;
    } catch (err) {
      err.message = "run recomment fail";
      err.status = 400;
      throw err;
    }
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
