const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log("Cookies:", req.cookies); 

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
