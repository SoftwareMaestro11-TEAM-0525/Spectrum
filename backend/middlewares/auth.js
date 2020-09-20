import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(403).json({
      sucess: false,
      message: "Token is missing",
    });
  }
  const token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(403).json({
      sucess: false,
      message: "Token is missing",
    });
  }

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  };

  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};

module.exports = authMiddleware;
