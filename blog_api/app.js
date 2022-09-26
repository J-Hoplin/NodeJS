const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()

app.set('port',process.env.PORT || 3000);
process.env.ENV === "dev" 
? app.use(morgan('dev'))
: app.use(morgan('combined'))

app.use(
    express.json(),
)

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})