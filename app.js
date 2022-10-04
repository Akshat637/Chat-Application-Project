let express = require("express");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let cors = require("cors");
const sequelize = require("./models/database");
let app = express();
app.use(bodyParser.json());
app.use(cors());

const signlogin=require('./routes/usersignup');
const User=require('./models/user');
const Message=require('./models/messages');
const messageroute=require('./routes/message');
const Group=require('./models/groups');
const Groupmessage=require('./models/groupmessage');
const Usergroup=require('./models/usergroups');
const CreateGroup=require('./routes/creategroup');
const groupMsgrouter=require('./routes/groupmsgs');

app.use(signlogin);
app.use(messageroute);
app.use(CreateGroup);
app.use(groupMsgrouter);

// user-message
User.hasMany(Message);
Message.belongsTo(User);


// user-group
User.hasMany(Usergroup);
Group.hasMany(Usergroup);
Usergroup.belongsTo(User);
Usergroup.belongsTo(Group);

// upper instead of this we can write this also----->
// User.belongsToMany(Group,{through:Usergroup});
// Group.belongsToMany(User,{through:Usergroup});

// user-groupmessage
User.hasMany(Groupmessage);
Groupmessage.belongsTo(User);


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
 