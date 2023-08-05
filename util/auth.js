const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(400).send({ message: "Permission denied" });
  } else {
    next();
  }
};

module.exports = isLoggedIn;
