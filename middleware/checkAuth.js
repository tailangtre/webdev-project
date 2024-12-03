module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  },

  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
      return next();
    }
    res.redirect("/");
  }
};
