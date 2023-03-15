var Userdb = require("../model/model");

// create and save new user
exports.create = (req, res) => {
  // validate request
  console.log("in create");
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // to save user in db

  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user");
    })
    .catch((e) => {
      res.status(500).send({
        message:
          e.message || "Some error occured while creating a create operation",
      });
    });
};

// retrive and return all users/ retrive or return single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((e) => {
        res.status(500).send({ message: "Error reteriving user with id" + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((e) => {
        res.status(500).send({
          message:
            e.message || "Error occured while retriving user information",
        });
      });
  }
};

// update and new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot Update user with ${id}. Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send(500).send({ message: "Error updating user information" });
    });
};

// delete a user with specified user id
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with ${id}, Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deletd Successfully",
        });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Could not delete User with id=" + id });
    });
};
