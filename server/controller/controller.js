var Userdb = require("../model/model");
const nodemailer = require("nodemailer");

// // middleware

// uplode.single('image) ??? kidr aiyga
// create and save new user
exports.create = async (req, res) => {
  // validate request
  // console.log("in create");
  // console.log("add user called");
console.log("create",req.files,req.file)
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
    image: req.file.filename,
  });
  console.log("user");
  // res.send()
  // send email to the email id

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "cooper.emmerich37@ethereal.email",
      pass: "gSX2GyeuaBknE6dwa7",
    },
  });
  try {
    let info = transporter.sendMail({
      from: '"Yash Dayama 👻" <cooper.emmerich37@ethereal.email>', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Welcome", // plain text body
      html: "<b>You have Successfuly login</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error: %s", error);
  }

  // to save user in db
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.log(e.message);
      res
        .status(500)
        .send("Some error occured while creating a create operation");
    });
};
// retrive and return all users/ retrive or return single user
exports.find = async (req, res) => {
  // console.log("Check");
  if (req.query.name) {
    const name = req.query.name;

    // console.log("This is from contorller user find by name");
    try {
      const users = await Userdb.aggregate([
        { $match: { name: name } },
        { $sort: { name: 1 } },
      ]);

      if (!users) {
        res.status(404).send({ message: "Not found user with name" });
        return;
      }

      res.send(users);
    } catch (e) {
      res.status(500).send({ message: "Error reteriving user with name" });
    }
  } else if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .sort({ name: 1 })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" });
        } else {
          res.send(data);
        }
      })
      .catch((e) => {
        res.status(500).send({ message: "Error reteriving user with id" });
      });
  } else {
    console.log(req.query);
    //  gender
    // const name = await user.find({name: {$regrex: search, $options: "i"}})

    if (req.query.gender) {
      // Userdb.gender = req.query.gender ===
      try {
        // inative query
        const filter = { gender: req.query.gender };
        // console.log(filter);
        const data = await Userdb.find({ gender: req.query.gender });

        // .aggregate([{ $match: filter }
        // , {$match : {status : "Inactive"}}
        //  ]);

        res.send(data);
        return;
      } catch (err) {
        console.log(err.message);
        res.status(500).send(err);
      }
    }

    Userdb.find()
      .sort({ name: 1 })
      // .sort("gender status")
      .then((user) => {
        console.log("user", user);
        res.send(user);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
};

// update and new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false }) //modify and returns single document
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot Update user with . Maybe user not found`,
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
          .send({ message: `Cannot delete with , Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deletd Successfully",
        });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Could not delete User with id" });
    });
};
