
let bcrypt = require('bcrypt');
let User = require('../models/user');

let jwt = require('jsonwebtoken');
let akshat = 'e73e34a6cb7af6c2f9872490c49eaf28b55b77864c4ea94af23d41fa64cb325a7ba004f60fbc87889fc8e05f45d4cb8afcdba45b9877a911a39ebc8c599db095';


exports.postuserdata = async (req, res) => {
  let { name, email, phonenumber, pwd } = req.body;
  if (name == undefined || name.length === 0 ||
    email == undefined || email.length === 0 ||
    pwd == undefined || pwd.length === 0) {
    res.status(400).json({ err: 'Something is Wrong' })
  }


  let password = await bcrypt.hash(pwd, 10);
  User.create({
    name, email, phonenumber, password
  })
    .then(result => {
      res.status(200).json({ message: 'successfuly' })
    })
    .catch(err => {
      res.status(400).json(err);
    })
};

// exports.postlogin = async (req, res) => {

//         let { email, pwd } = req.body;
//         if (email == undefined || email.length === 0 ||
//             pwd == undefined || pwd.length === 0) {
//             res.status(400).json({ err: 'something is wrong' })
//         }
//         // let user;
//         const user = await User.findAll({ where: { email } }).then((user) =>{
//         if (user.length > 0) {
//             if (user[0].pwd === pwd) {
//                 res.status(200).json({ success: true, message: 'user login successfully' })
//             } else {
//                 return res.status(400).json({ success: false, message: 'password is incorrect' })
//             }
//         } else {
//             return res.status(404).json({ success: false, message: 'user dosenot exit' })
//         }
//     })
//      .catch ((err) =>{
//         return res.status(500).json({ success: true, message: err })
//     })
// }

exports.postlogin = async (req, res) => {
  let { email, pwd } = req.body;

  let user = await User.findAll({ where: { email: email } });

  if (user.length > 0) {
    const dbid = user[0].id;
    const dbemail = user[0].email;
    const dbpassword = user[0].password;
    const dbname = user[0].name;
    const dbphonenumber = user[0].phonenumber;

    const emailpwdmatch = await bcrypt.compare(pwd, dbpassword);


    if (emailpwdmatch) {
      const token = jwt.sign(dbid, 'akshat1234567890');
      res.status(200).json({ msg: "login successful", token: token});
    } else {
      res.status(401).json({ msg: "something went wrong" });
    }
  }
  else {
    res.status(404).json({ msg: "user not found" });

  }

};
