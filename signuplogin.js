
const User = require('../models/user');



exports.postuserdata = (req, res) => {

    let name, email, phonenumber, pwd = req.body;
    if (name == undefined || name.length === 0 ||
        email == undefined || email.length === 0 ||
        pwd == undefined || pwd.length === 0) {
        return res.status(400).json({ err: 'Something is Wrong' })
    }
    User.create({
        name, email, phonenumber, pwd
    }).then((result) => {

        res.status(200).json({ message: 'successfuly' })
    })
        .catch(err => {
            res.status(400).json({ err: 'wrong' });
        })
}

