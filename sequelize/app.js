const express = require('express')
const path = require('path')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')

dotenv.config()
const { sequelize } = require('./models')

const app = express()
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'njk');
nunjucks.configure('views',{
    express: app,
    watch: true
})

// sync 메소드를 통해서 서버 실행시 MySQL과 연결한다.
// force를 true로 설정하면 서버 실행시마다 테이블을 재생성한다.
sequelize.sync({force: false})
.then(() => {
    console.log("DB Successfully connected")
})
.catch((err) => {
    console.error(err)
})

app.use(process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('combined'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} router not found`)
    error.status = 404;
    next(error)
})

app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {}
    return res.render('./error.njk')
})

app.listen(app.get('port'),() => {
    console.log(`Listening on port ${app.get('port')}`)
})