const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller.js");
const { authController } = require("./controller/auth_controller.js");
const { ensureAdmin, forwardAuthenticated, ensureAuthenticated } = require("./middleware/checkAuth.js");
const session = require("express-session");
const passport = require("./middleware/passport");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(passport.initialize());
app.use(passport.session());


// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implemented
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

// Implemented
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

// Fixed.
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated ,authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", passport.authenticate("local", {
  successRedirect: "/reminders",
  failureRedirect: "/login",
}));

// Admin route
app.get("/admin", ensureAdmin, authController.admin);
app.get("/admin/revoke/:id", ensureAdmin, authController.revoke);



app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
