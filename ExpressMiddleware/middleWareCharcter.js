const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')

const app = express()
dotenv.config()
app.set('port', process.env.PORT || 3000)

/**
 * 
 * 
 * 미들웨어 : req,res,next를 매개변수로 가지는 함수이다.
 * 에러처리 미들웨어만 예외적으로 : err,req,res,next를 가진다.
 */

// 한번에 미들웨어 장착하기
// 안에 있는 미들웨어들은 순차적으로 호출하게 된다.
// express.static 같은 경우에는 상황에 따라 다음 미들웨어가 실행되지 않을 수 도 있는것이다.

process.env.NODE_ENV === "dev"
? morgan('dev')
: morgan('combined')

app.use(
    express.static(path.join(__dirname,'public')),
    express.json(),
    express.urlencoded({
        extended:false
    },
    cookieParser(process.env.COOKIE_SECRET)
    )
)

/**
 * next 함수에 인수를 넣을 수 도 있다.
 * 인수를 넣으면 특수한 동작을 한다. route 라는 문자열을 넣으면 다음 라우터 미들웨어로 바로 이동하고, 그 외 인수를 넣으면 에러 처리 미들웨어로 이동한다.
 * 이때 인수는 에러처리 미들웨어의 err변수가 된다. 
*/

app.use('/testnexterror', (req,res,next) => {
    const err = {
        message: "example error message",
        code: 11
    }
    next(err)
})

app.use(({message,code},req,res,next) => {
    return res.status(500).send(`${code} : ${message}`)
})

/**
 * 미들웨어 간에 데이터를 전달할 수 도 있다.
 * 세션을 사용하면, req.session객체에 데이터를 넣어도 되지만
 * 이는 세션이 유지될 때까지 데이터가 유지된다는 단점이 있다. 요청이 끝날때 까지만 데이터를 유지하고 싶은 경우에는, req객체에 데이터를 넣는것이좋다.
 * 
 */


app.get('/testreqdata', (req,res,next) => {
    try{
        req.data = 'test_data',
        next()
    }catch{
        // next에 
        const err = {
            message: "example error message2",
            code: 11
        }
        next(err)
    }
    
}, (req,res,next) => {
    console.log(req.data);
    res.status(200)
    res.write("<h1>Request data test</h1>")
    res.end(`req.data : ${req.data}`)
})
/**
 * app.set과의 차이로느
 * app.get, app.set같은 경우에는 전역적인 처리로 이어진다. 그렇기 때문에 모든 요청이 공유해야 하는 경우에는 적절하지만
 * 각 요청에 대해 처리르 해줘야할때는 매우 위험한 방법이다.
 */

app.listen(app.get('port'), () => {
    console.log(`Listening on port : ${app.get('port')}`)
})