/**
 * Node mon을 사용하면, 서버 코드 수정사항이 생길 때마다 매번 서버를 재시작해준다.
 * 
 * nodemon이 실행되는 콘솔에 rs를 입력해서 재시작할 수 도 있다.
 */

const express = require('express')

// Express 모듈 실행
const app = express()

// app.set(key,value) 를 이용해 데이터를 저장할 수 있다
// 추후 app.get(key)로 데이터를 가져올 수 있다.
app.set('port',process.env.PORT || 3000)

//app.get(address, router) : 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분이다.
app.get('/',(req,res) => {
    res.send("<h1>Hello express</h1>");
})

// node js http 메소드와 동일한 역할을 한다.
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`)
})

// GET 요청 외에도 post, put patch delete option에 대한 라우터를 위한 메소드 존재한다/