const Sequelize = require('sequelize');
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.join(__dirname,"../.env")
})
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]
const db = {}

// Sequelize는  시퀄라이즈 패키지 생성자이다. config/config.json에서 데이터베이스 설정을 불러온 후에 new Sequelize를 통해 MySQL 연겨랙체를 생성한다.
// 마지막 config를 넣어주는 이유는 마지막에 host, dialect를 인자로 가져가게 되는데 이를 위해 대입해준다.

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize

module.exports = db