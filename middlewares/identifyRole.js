module.exports = {
  isAdmin(req, res, next) {
    const user = req.user;

    if (user.role !== "admin" && user.role !== "superadmin") {
      res.status(403).json({
        status: 403,
        message: "User not Allowed",
      });
      return;
    }

    next();
  },

  isSuperAdmin(req, res, next) {
    const user = req.user;

    if (user.role !== "superadmin") {
      res.status(403).json({
        status: 403,
        message: "User not Allowed",
      });
      return;
    }

    next();
  },
};
