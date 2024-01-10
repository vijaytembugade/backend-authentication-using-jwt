const jwt = require("jsonwebtoken");

const tokenValidator = (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) {
      throw Error("Provide a token");
    }
    jwt.verify(token, "vijay", (err, decodedToken) => {
      if (err) {
        throw Error("Invalid Token");
      } else {
        console.log(decodedToken);
        req.email = decodedToken.email;
        next();
      }
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = tokenValidator;
