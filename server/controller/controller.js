var Userdb = require("../model/model");
const nodemailer = require('nodemailer')
// const multer = require("multer")

// const upload = multer({
//   dest: 'avatars',
//   limits:{
//       filesize: 1000000
//   },
//   fileFilter(req, file, cb){
//       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//           return cb(new Error('Please upload an Image'))
//       }
//       cb(undefined, true)
//       // cb(new Error('File must be PDF'))
//       // cb(undefined, true)
//       // cb(undefined, false)
//   }
// })

// create and save new user
exports.create = async (req, res) => {
  // validate request
  // console.log("in create");
  // console.log("add user called");

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
    // image: req.body.
    // {
      // data: req.file.filename,
      // contentType: 'image/png'
    // }
  });
  // const buffer = await (req.file.buffer).png().toBuffer()
  // req.user.avatar = buffer 
  // await req.user.save()
  // res.send()
  // send email to the email id 

      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cooper.emmerich37@ethereal.email',
            pass: 'gSX2GyeuaBknE6dwa7'
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
        console.log("Error: %s", error)
        
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

}
// retrive and return all users/ retrive or return single user
exports.find = async (req, res) => {
  console.log("Check");
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
    //  gender
// const name = await user.find({name: {$regrex: search, $options: "i"}})

    if (req.query.gender) {
      // Userdb.gender = req.query.gender === 
      try {
        // inative query 
        const filter = { gender: req.query.gender }; 
console.log(filter);
        const data = await Userdb.aggregate([{ $match: filter }
          // , {$match : {status : "Inactive"}}
               ]);

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
        console.log("user",user);
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
