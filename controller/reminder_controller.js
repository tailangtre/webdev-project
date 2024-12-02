let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: "false",
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    findReminder = database.cindy.reminders.find(function (reminder) {
      return reminder.id == req.params.id;
    });
    findReminder.title = req.body.title;
    findReminder.description = req.body.description;
    findReminder.completed = req.body.completed;
    console.log(findReminder);
    res.redirect("/reminder/" + findReminder.id);
  },

  delete: (req, res) => {
    // Implement this code
    findReminder = database.cindy.reminders.find(function (reminder) {
      return reminder.id == req.params.id;
    });
    database.cindy.reminders.splice(database.cindy.reminders.indexOf(findReminder), 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
