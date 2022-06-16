const jsonwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jsonwt.verify(token, "mandeptrai30cm");
    console.log(decode);
    if (decode) {
      req.user = decode;
      next();
    } else {
      res.status(401).send("You not login!");
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  authenticate,
};
