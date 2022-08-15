const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')

// Initiate dot env configuration
dotenv.config()
// load express
const app = express()
// app default port
app.set('port', process.env.PORT || 3000)
// Initiate cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET))
// set body-parser : JSON
app.use(express.json())
// set body-parser : URL encoded : set extended false -> Use node js native Query String module
app.use(express.urlencoded({
    extended: false
}))

// Set application static resource
app.use('/', express.static(path.join(__dirname,'public')))

// set morgan mode
if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'))
}else{
    app.use(morgan('combined'))
}


// Check cookie about every request
app.use((req,res,next) => {
    console.log(`Request's normal Cookies list : ${JSON.stringify(req.cookies)}`)
    console.log(`Request's secret-signed Cookies list : ${JSON.stringify(req.signedCookies)}`)
    next()
})

// Set session : cookie-parse 미들웨어 뒤에 선언하는것이 좋다.
// express-session은 인수로 세션에 대한 설정을 받는다.
// resave : 요청이 들어올 때 세션에 수정 사항이 생기지 않더라도 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것이다.
// saveUninitialized : 세션이 저장되기 전에 uninitialized 상태로 만들어서 저장한다.
// secret : Cookie의 Secret과 동일하다. 이 값을 기반으로 세션을 암호화 하는 것이다.
// cookie : 세션 쿠키에 대한 값이다.
// name : 세션 이름

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        expires: new Date(Date.now() + 1000000) ,
        httpOnly:true,
        secure: false
    },
    name: 'session-cookie'
}))

// 모든 요청의 session에 대해서 변수를 넣는다
// 세션은 각 requesst 하나씩에 대해 독립적으로 적용된다.
app.use((req,res,next) => {
    req.session.exampleVariable = "Test Variable"
    console.log(`${req.session.exampleVariable}`)
    next()
})

// 기본적인 접속
app.get('/makesession', (req,res) => {
    console.log(`${JSON.stringify(req.session)}`)
    return res.redirect('/')
})

// 세션 삭제
app.get('/deletesession', (req,res) => {
    req.session.destroy()
    console.log(`${JSON.stringify(req.session)}`)
    return res.redirect('/')
})


// sessionStore를 통해서 등록된 세션 목록들을 볼 수 있다.
app.get('/checksession', (req,res) => {
    console.log(req.originalUrl)
    console.log(JSON.stringify(req.sessionStore))
    return res.redirect('/')
})

// store라는 옵션도 존재한다
// 기본적으로 세션은 서버를 재시작하면 꺼지게 되는데 store에 데이터 베이스를 연결하여 세션을 유지할 수 있다.
// 주로 이 옵션을 키고 사용하며, 보통 레디스를 사용한다.

app.listen(app.get('port'), () =>  {
    console.log(`listening on port ${app.get('port')}`)
})

