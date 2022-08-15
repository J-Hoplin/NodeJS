const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

/**
 * 
 * Cookie Parser는 요청에 동봉된 쿠키를 해석하여 req.cookies객체로 만든다.
 * 
 * 앞에서 Cookie실습시 작성한 parseCookies함수와 비슷하다.
 * 
 * 
 * const parseCookies = (cookie = '') => {
    return cookie.split(';')
    .map(v => v.split('='))
    .reduce((acc,[k,v]) => {
        acc[k.trim()] = decodeURIComponent(v)
        return acc
    }, {})
}
 * 
 */

// cookie-parser미들웨어는 아래와 같이 사용한다
// 유효 기간이 지난 쿠키는 알아서 걸러낸다.

dotenv.config()
const app = express()
app.set('port', process.env.PORT || 3000)


if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'))
}else{
    app.use(morgan('combined'))
}

app.use(cookieParser(process.env.COOKIE_SECRET))

//curl --cookie "test=testCookie" http://127.0.0.1:3000 
app.use((req,res,next) => {
    console.log(`Cookie : ${JSON.stringify(req.cookies)}`)
    console.log(`Signed Cookies : ${JSON.stringify(req.signedCookies)}`)
    next()
})
// 일반 쿠키는 req.cookies에 저장된다
// Signed 쿠키는 req.signedCookies에 저장되게 된다.

// cookie-parser가 쿠키를 생성할 때 쓰이는것은 아니다. 쿠키를 생성 /제거 하기 위해서 res.cookie, res.clearCookie메소드를 사용해야한다

/**
 * cookie객체 속성목록
 * 
 * secret : signed시키는 암호키로 string, array 형태로 가능하다
 * maxAge : 만료시간을 밀리초로 설정
 * expires : 만료시간을 GMT로 설정
 * path : cookie 경로
 * secure : https에서만 쿠키를 사용할 수 있도록 설정
 * httpOnly : 웹서버를 통해서만 쿠키 접근할 수 있도록 설정
 * signed : cookie가 서명 되어야 하는지를 결정한다.
 */


app.get('/',(req,res) => {
    res.cookie('visited','visited_guest',{
        expires: new Date(Date.now() + 1000000),
        secret: process.env.COOKIE_SECRET,
        signed:true,
        httpOnly: true,
        secure: true,
    })
    res.cookie('example_cookie','example_cookie_value')
    return res.send("Test Response")
})


app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 listening`)
})
