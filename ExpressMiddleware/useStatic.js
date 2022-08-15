const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')


dotenv.config()
const app = express()
app.set('port',process.env.PORT || 3000)

if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'))
}else{
    app.use(morgan('combined'))
}

// static : 정적인 파일들을 제공하는 라우터 역할을 한다.
// express 객체 안에서 꺼내 장착하면 된다.
// app.use('요청경로',express.static('실제경로'))


// 아래와 같이 하게 되면, 파일 디렉토리 접근방식으로 하지 않기 때문에, 외부인이 서버의 구조를 쉽게 파악할 수 없다
// 이러한 점에서 보안에 큰 도움을 주게 된다.
app.use('/', express.static(path.join(__dirname,'public')))
// 파일을 발견하면 해당 파일을 반환하고 다음 미들웨어는 실행하지 않는다
// 만약 발견하지 못하면 다음 미들웨어를 실행한다.


app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
})
