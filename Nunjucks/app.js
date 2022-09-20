const express = require("express")
const path = require("path")
const nunjucks = require("nunjucks")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

// Router
const rt1 = require('./router')

dotenv.config()
const app = express()

// Set Express application Middleware
app.set("port",process.env.PORT || 3000)
app.set('view engine','njk')

process.env.NODE_ENV==="production"
? app.use(morgan('combined'))
: app.use(morgan('dev'))

app.use(
    express.json(),
    express.urlencoded({
        extended:false
    }),
    cookieParser(process.env.CookieSecret || "COOKIEPARSER")
)

// Set Nunjucks configuration
/**
 * 첫번째 인수로 views폴더의 경로를 넣는다.
 * 두번째 인수로 옵션을 넣는다.
 * 
 * - express 속성에 app 객체를 연결한다
 * - watch 옵션이 true이면 HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링 한다는 의미이다.
 * 
 * 만약 넌적스임을 구분하기 위해서는 확장자를 njk로 쓰면 된다. 단 이때 view engine도 njk로 바꿔줘야 한다.
 * 
 * 
 */
nunjucks.configure('views',{
    express: app,
    watch: true
})

app.use('/ex',rt1)

app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} router not exist`)
    error.status = 404;
    next(error)
})

/**
 * res.locals를 사용하여변수에 값을 넘길 수 도 있다
 * 
 */
app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500)
    res.render('./iferrors/error.njk');
})


app.listen(app.get("port"),() => {
    console.log(`Listening on port ${app.get("port")}`)
})