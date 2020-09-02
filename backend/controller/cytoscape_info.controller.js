const Cytoscape_info = require("../models/Cytoscape_info");

/*
    GET /api/cytoscape_info/:user_id
*/

exports.read = (req, res) => {
  Cytoscape_info.findOneByUser_id(req.params.user_id).then((cytoscape_info) => {
    if (!cytoscape_info)
      return res
        .status(404)
        .json({ success: false, message: "cyjson not found" });
    else
      return res.status(200).json({
        success: true,
        cyjson: cytoscape_info,
      });
  });
};

/*
    POST /api/cytoscape_info
    {
        user_id,
        cyjson
    }
*/

exports.write = (req, res) => {
  Cytoscape_info.create(req.body.user_id, req.body.cyjson)
    .then((cyjson) => res.json({ success: true, cyjson: cyjson }))
    .catch((err) =>
      res.status(404).json({ success: false, message: err.message })
    );
};

/*
    PUT /api/cytoscape_info
    {
        user_id,
        cyjson
    }
*/

exports.update = (req, res) => {
  Cytoscape_info.updateByUser_id(req.params.user_id, req.params.cyjson)
    .then(() => res.status(200).json({ success: true }))
    .catch((err) =>
      res.status(404).json({ success: false, message: err.message })
    );
};
