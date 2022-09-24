const Sequelize = require('sequelize');
const sequelize = new Sequelize('chat', 'root', 'AK_yadav637',{
dialect: 'mysql',
host: 'localhost'
})
module.exports = sequelize;