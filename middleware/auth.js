const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = async (req, res, next) => {
  try {
    console.log("yoyoyoyogg")
    let token = req.headers.authorization?.replace("bearer ", "");
    let loggedIn = false;
    // console.log(token);
    try {
      if (token) {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log({ decoded });
        loggedIn = true;
      }
    } catch (err) {}
    // console.log("hello");
    if (loggedIn) {
      next();
    } else {
      return res.status(401).send("Unauthorized access");
    }
    
  } catch (err) {
    res.send({ error: err });
  }
};

module.exports = auth;
