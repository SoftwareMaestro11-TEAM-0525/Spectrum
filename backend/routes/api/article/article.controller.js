const Article = require("../../../models/Article");

/*
    GET /api/article/:user_id/:node_id
*/

exports.read = (req, res) => {};

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
