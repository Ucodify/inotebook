var jwt = require("jsonwebtoken");
const JWT_SECRET = "hARRYISAgoodb$boy";

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and append and id to req object
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: " 1Please authenticate using a valid token" });
  }
  try {
    console.log("token", token, JWT_SECRET);
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "2Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
