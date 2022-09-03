/**
 * 시퀄라이즈를 통해 익스프레스 앱과 MySQL을 연결해야한다.
 * 
 */

const express = require('express')
const path = require('path')
const morgan = require('morgan');
const nunjucks = require('nunjucks');

// models에서 정의한 sequelize객체를 가져온다.
const { sequelize } = require('./models')

// Express app
const app = express();
app.set('port', process.env.PORT || 3000)
app.set('view engine','html')

// sync메소드를 사용해서 서버 실행 시 MySQL과 연동되도록 한다. 내부에 force:false옵션이 있는데,
// 이 옵션을 true로 설정하면 서버 실행시마다 테이블을 재생성 한다.
// 테이블을 잘못만든 경우에, 이 옵션을 true로 하면 된다.
sequelize.sync({force: false})
.then(() => {
    console.log("Database connection success")
})
.catch((err) => {
    console.error(err)
})

// Set logger - morgan
process.env.NODE_ENV === "production"
? app.use(morgan('combined'))
: app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use((req,res,next) => {
    const error = new Error(`Router not found : ${req.method} ${req.url}`)
    error.status = 404;
    next(error);
})

app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    return res.send(err.message)
})

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})