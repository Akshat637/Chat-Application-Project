const express = require('express');
const bodyParser = require('body-parser');
let jwt =require('jsonwebtoken')
let bcrypt=require('bcrypt');
const cors = require('cors');
const sequelize = require('./models/database');


const User = require('./models/user')
const Message = require('./models/message')

const app = express();


app.use(bodyParser.json());
app.use(cors());

let SignUpLogin=require('./routes/usersignup');
const messageroute = require('./routes/message');

app.use(SignUpLogin);
app.use(messageroute);

User.hasMany(Message);
Message.belongsTo(User);

sequelize
// .sync({force: true})
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(8400, () => {
      console.log(" listening to 8400 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });