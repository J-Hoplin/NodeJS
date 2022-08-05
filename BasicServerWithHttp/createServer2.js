const http = require('http')

/**
 * listen메소드에 콜백함수를 넣는 대신 listening이벤트 리스너를 붙여도 된다. 
 * 
 * 
 */

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'})
    res.write("<h1>Hello world</h1>")
    res.end("<p>Hello Server</p>")
})

server.listen(8080);

// Listening 
server.on('listening', () => {
    console.log("listening on 8080 port")
})
// Error
server.on('error', (err) => {
    console.error(err)
})
/**
 * 당연한 사실이지만, 서버의 소스코드가 변경되면, 종료했다가 다시 실행해야한다
 * 
 */
