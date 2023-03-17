var Userdb = require("../model/model");
// const multer = require("multer")

// img storage
// const Storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) =>{
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({
//   storage: Storage
// }).single('testImage')

// const uplode = multer({
//   dest: 'images'
// })

// create and save new user
exports.create = (req, res) => {
  // validate request
  // console.log("in create");

  console.log("add user called");

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
    // image: {
    //   data: req.file.filename,
    //   contentType: 'image/png'
    // }
  });

  // send email to the email id 
  // const sendMail = await nodemailer.sendMail(user.email)

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
  console.log("find all called");
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
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
    // params mai gender
    if (req.query.gender) {
      try {
        // incative query 
        const filter = { gender: req.query.gender }; 

        const data = await Userdb.aggregate([{ $match: filter }, {$match : {status : "Inactive"}}]);

        res.send(data);
        return;
      } catch (err) {
        console.log(err.message);
        res.status(500).send(err);
      }
    }

    Userdb.find()
      // .sort("gender status")
      .then((user) => {
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
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
