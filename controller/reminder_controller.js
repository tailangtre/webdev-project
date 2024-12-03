const { db } = require("../prisma/database");

let remindersController = {
  list: async(req, res) => {
    let reminders = await db.reminder.findMany(
      {
        where: {
          userId: req.user.id
        }
      }
    );
    res.render("reminder/index", { reminders: reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let reminderToFind = parseInt(req.params.id);
    let searchResult = await db.reminder.findUnique({
      where: {
        id: reminderToFind
      }
    })
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      this.list();
    }
  },

  create: async (req, res) => {
    let reminder = {
      title: req.body.title,
      description: req.body.description,
      completed: "false",
      userId: req.user.id
    };
    await db.reminder.create(
      {data: reminder}
    );
    res.redirect("/reminders");
  },

  edit: async (req, res) => {
    let reminderToFind = parseInt(req.params.id);
    let searchResult = await db.reminder.findUnique({
      where: {
        id: reminderToFind
      }
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: async (req, res) => {
    // implement this code
    await db.reminder.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
      }
    })
    res.redirect("/reminder/" + req.params.id);
  },

  delete: async (req, res) => {
    // Implement this code
    await db.reminder.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
