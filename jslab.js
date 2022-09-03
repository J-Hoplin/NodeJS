const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.join(__dirname, "sequelize_practice/.env")
})

console.log(process.env.NODE_ENV)