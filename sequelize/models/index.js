const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]
const db = {}

// Sequelize : 시퀄라이저 패키지이자 생성자이다.
const sequelize = new Sequelize(config.database,config.username,config.password,config);

// 나중에 재사용하기 위해서 db.sequelize에 넣어둔다.
db.sequelize = sequelize
module.exports = db