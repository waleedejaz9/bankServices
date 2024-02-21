const jwt = require("jsonwebtoken");
const CONFIG = require("../config");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, CONFIG.JWT, { expiresIn: "30d" });
      req.user =
        decoded.client_id === CONFIG.ClientID &&
        decoded.client_secret === CONFIG.ClientSecret;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        httpCode: "401",
        httpMessage: "Unauthorized",
        moreInformation:
          "This server could not verify that you are authorized to access the URL",
      });
    }
  }

  if (!token) {
    return res.status(401).json(
      {
        httpCode: "401",
        httpMessage: "Unauthorized",
        moreInformation:
          "This server could not verify that you are authorized to access the URL",
      }
    )
    
  }
};

module.exports = { protect };
