const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

// Get Routers
const indexRoute = require('./routes')
const userRoute = require('./routes/user')


dotenv.config()
const app = express()
app.set('port', process.env.PORT || 3000)

/**
 * 라우터를 많이 연결하면 app.js 코드가 길어진다
 * 
 * 익스프레스는 라우터를 분리할 수 있도록 방법을 제공한다
 * router는 app.get, app.post같은 메소드들이 해당된다.
 * 
 * routes라는 폴더를 만들고 index, user .js를 만든다
 */

process.env.MODE === 'production'
? app.use(morgan('combined'))
: app.use(morgan('dev'))


// express app에 Router 등록ㄴ
app.use('/',indexRoute)
app.use('/user',userRoute)


app.use((req,res,next) => {
    throw new Error("example error")
})

app.use((err,req,res,next) => {
    console.error(err);
    console.log("here")
    return res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})
