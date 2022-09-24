const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/database');
const User = require('./models/user')

const app = express();


app.use(bodyParser.json());
app.use(cors());

let SignUpLogin=require('./routes/usersignup');

app.use(SignUpLogin);


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