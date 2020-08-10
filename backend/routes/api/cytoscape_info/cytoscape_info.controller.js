const Cytoscape_info = require("../../../models/Cytoscape_info");

/*
    GET /api/cytoscape_info/:user_id
*/

exports.read = (req, res) => {
  console.log(req.params);
  Cytoscape_info.findOneByUser_id(req.params.user_id).then((cytoscape_info) => {
    if (!cytoscape_info)
      return status(404).json({ message: "cyjson not found" });
    res.json({
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
    .then((cyjson) => res.json({ cyjson }))
    .catch((error) => res.status(500).json({ success: false, message: error }));
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
    .then((cyjson) => res.status(200).json({ success: true, cyjson: cyjson }))
    .catch((err) => res.status(500).json({ success: false, message: error }));
};
