const experss = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')

dotenv.config()
const app = experss()
app.set('port',process.env.PORT || 3000)

if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'))
}else{
    app.use(morgan('combined'))
}

app.use('/',experss.static(path.join(__dirname,'public')))

/**
 * body-parser : 본문에 있는 데이터를 해석해서 req.body객체로 만들어주는 미들웨어이다.
 * 
 * 보통 form이나 AJAX 요청에 대해서 데이터를 처리한다. 단 이미지 동영상 같은 멀티파트 데이터는 처리하지 못한다.
 * 멀티파트 데이터는 multer라는것을 이용해서 처리한다.
 * 
 * 
 * Node 4.16부터는 body-parser미들웨어의 일부 기능이 익스프레스에 내장되어 설치할 필요가 없지만
 * Raw, Text 형식을 해석할때는 따로 설치한다.
 */

// express.urlencoded에서 extended가 false이면, querystring모듈을, true이면 qs를 사용한다.

// JSON형식의 데이터 전달 방식
app.use(experss.urlencoded({
    extended: false
}))// 주소 형식으로 데이터를 보내는 방식이다. Form 데이터는 주로 URL-encoded방식을 많이 사용한다.
// http POST, PUT 요청의 본문을 받으려면, req.on('data'), req.on('end')로 스트림을 사용해야했다
// body-parser를 사용하면, 내부적으로 스트림을 처리해 req.body에 추가한다.

app.use(experss.json())


//
app.get('/formdata',(req,res) => {
    return res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/formdata',(req,res) => {
    console.log(req.body)
    res.redirect('/')
})


// Postman or Insomnia로 테스트
app.get('/jsondata', (req,res) => {
    return res.sendFile(path.join(__dirname,'jsondata.html'))
})

app.post('/jsondata',(req,res) => {
    console.log(req.body)
    res.redirect('/')
})


app.use((err,req,res,next) => {
    return res.status(500).send(err.message)
})


app.listen(app.get('port'),() => {
    console.log(`Listening on port ${app.get('port')}`)
})