const auth = (req, res, next) => {
    const { name } = req.cookies;
  
    if (name) {
      req.user = name;
      next();
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
  
  module.exports = { auth };