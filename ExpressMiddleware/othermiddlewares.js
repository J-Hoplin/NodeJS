/**
 * dotenv : process.env를 관리하기 위해서 사용한다.
 * 
 * 
 */


const express = require('express');
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const session = require('express-session')
const dotenv = require('dotenv')
const path = require('path')

// dotenv 패키지는 .env파일을 읽어서 process.env로 만든다. 
dotenv.config()
const app = express()

app.set('port',process.env.PORT || 3000)


// 설치한 각 패키지들을 불러온 후 app.use에 연결한다. req,res,next 매개변수가 없지만 이는 각 미들웨어 내부적으로 존재한다
// 또한 next를 호출하므로 다음 미들웨어로 넘어간다.


app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'session-cookie'
}))

app.use((req,res,next) => {
    console.log("모든 요청에 대해 실행한다.")
    console.log("here")
    next()
})

app.get('/', (req,res,next) => {
    console.log('GET 요청에 대해서만 실행된다')
    console.log("here2")
    next()
}, (req,res) => {
    console.log("here3")
    throw new Error("에러는 에러 처리 미들웨어로 간다")
})

app.use((err,req,res,next) => {
    console.error(err);
    console.log("here4")
    res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 listening`)
})