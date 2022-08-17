const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()
app.set('port', process.env.PORT || 3000)

process.env.MODE === 'production'
? app.use(morgan('combined'))
: app.use(morgan('dev'))

app.use(
    express.json(),
    express.urlencoded({
        extended: false
    }),
    cookieParser(process.env.COOKIEPARSE || 'cookiesecret')
)

const exampleRoute = require('./routes/pattern')
const useCaseRoute = require('./routes/useCase')

app.use('/user', exampleRoute)

app.use('/usecase',useCaseRoute)

app.use((req,res,next) => {
    return res.status(404).send("<h1>Page not found</h1>")
})
app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})
