const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

// dotenv.config() : dotenv파일을 불러온다
dotenv.config()
const app = express()
app.set('port', process.env.PORT || 3000)

// https://www.npmjs.com/package/morgan

// morgan은 요청과 응답에 대한 정보를 콘솔에 기록한다.
// morgan의 인자로는 dev, combined, common, short, tiny 등을 넣을 수 있다.
// 인수가 달라지면, 그에 맞게끔 로그 또한 달라진다.

// 주로 개발할 때 dev로 하고, produciton 레벨에서는 combined를 사용한다고 한다
// combined같은 경우에는 불특정 다수가 접속하므로, IP로그도 남는다
// dev는 축약된 로그를 출력한다.
if(process.env.NODE_ENV === "dev"){
    console.log("here")
    app.use(morgan('dev'))
}else{
    console.log("there")
    app.use(morgan('combined'))
}

app.use((req,res,next) => {
    res.write("<h1>This is from default middleware</h1>")
    next()
})

app.get("/",(req,res) => {
    res.end("Hello index page!")
})



app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번에서 listening`)
})