/**
 * middleware : 익스프레스의 핵심이다. 요청과 응답의 중간에 위치하여 미들웨어 라고 하며
 * 
 * 미들웨어가 익스프레스의 전부라고 해도 된다.
 * 미들웨어는 요청과 응답을 조작하여 기능을 추가하기도 하고 요청을 걸러내기도 한다.
 * 
 * 
 * 미들웨어는 app.use와 함께 사용되며, app.use(middleware) 형식이다.
 * 
 * app.use에는 매개변수가 req,res,next인 함수를 넣으면 된다. 미들웨어는 위에서 아래까지 순서대로 실행되면서 요청 응답 사이에 특별한 기능을 추가한다.
 * 
 * next매개변수는 다음 미들웨어로 넘어가는 함수이다. next를 실행하지 않으면 다음 미들웨어로 넘어가지 않는다. 
 * 
 * 
*/


const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3000)


/**
 * 미들웨어가 실행되는 경우
 * 
 * app.use(middleware) : 모든 요청에 대해서 미들웨어를 실행한다
 * 
 * app.use('/abc', middleware) : abc로 시작하는 요청에 대해서 미들웨어를 실행한다
 * 
 * app.post('/abc', middle ware) : abc로 시작하는 POST 요청에 대해서 middleware를 실행한다.
 * 
 * app.use, app.get같은 라우터에 미들웨어를 여러개 장착할 수 있다. app.get라우터에 미들웨어 두개가 들어있고, 
 * next를 호출해서 다음 미들웨어로 넘어갈 수 있다.
 * 
 * app.get의 두번째 미들웨어 같은 경우 에러 발생과 에러 처리 미들웨어로 전달된다
 * 
 * 에러 처리 미들웨어는 err,req,res,next 총 네개의 매개변수를 가져야 하며, 이는 꼭 지켜야 하는 사항이다.
 * 
 * err에 에러관련 정보가 담겨있다. res.status를 이용해서 상태코드를 바꿀 수 있으며, 에러 처리 미들웨어를 연결하지 않아도
 * 익스프레스에서 에러처리를 하지만, 웬만하면 연결해 주는것이 좋다.
 */
app.use((req,res,next) => {
    console.log("모든 요청에 대해 실행한다.")
    console.log("here")
    next()
})

app.get('/', (req,res,next) => {
    console.log('GET 요청에 대해서만 실행된다')
    console.log("here2")
    next()
}, (req,res) => {
    console.log("here3")
    throw new Error("에러는 에러 처리 미들웨어로 간다")
})

app.use((err,req,res,next) => {
    console.error(err);
    console.log("here4")
    res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 listening`)
})