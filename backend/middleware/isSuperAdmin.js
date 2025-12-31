const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if ( req.user.role !== "superadmin") {
    return res.status(403).json({ message: "You Don't have permission to access this Functionality" });
  }

  next();
};

module.exports = isSuperAdmin;
