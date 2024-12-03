const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next(); // Allow access if user is an admin
    }
    res.redirect("/dashboard");
  };
  
  module.exports = isAdmin;