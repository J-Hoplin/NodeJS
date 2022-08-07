/**
 * 서버는 클라이언트에 요청자를 추정할 만한 정보를 쿠키로 만들어서 보내준다.
 * 그 다음 클라이언트로부터 쿠키를 받아 요청자를 파악한다.
 * 쿠키는 요청헤더에 담겨서 전송된다. 브라우저는 응답 헤더에 따라 쿠키를 저장한다. 
 * 
 * 
 * 쿠키는 name=hoplin과 같이 문자열로 존재한다. 쿠키간에는 세미콜론으로 구분된다.
 * 쿠키는 기본적으로 req.headers.cookie에 담겨서 온다.
 * 
 */

const http = require('http')

http.createServer((req,res) => {
    console.log(req.url, req.headers.cookie)
    res.writeHead(200, {'Set-Cookie' : 'mycookie=test'}) // 브라우저에 쿠키를 심으라고 요청
    res.end()
}).listen(8003, () => {
    console.log(`listening on port 8003`)
})