const http = require('http')

/**
 * createServer 메소드 뒤에 listen메소드를 붙이고, 클라이언트에 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백함수를 넣는다.
 * 
 * res 객체에는 res.writeHead, res.write,res.end메소드가 있다.
 * 
 * - res.writeHead : head를 작성하는 메소드이다. 첫번째 인자로는 응답코드, 두번쨰 인자로는 응답에 대한 정보를 보낸다.결론적으로 헤더 부분이다.
 * - res.write : body를 작성하는 메소드이다. 클라이언트에 보낼 데이터를 작성해 준다.
 * - res.end : 응답을 종료하는 메소드이다. 만약 인수가 있으면, 데이터를 크라이언트로 보내고 나서 응답을 종료한다.
 * 
 * 
 */

http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type' : 'text/html; charset=urf-8'})
    res.write('<h1>Hello node</h1>')
    res.end('<p>Hello Server</p>')
}).listen(8080, () => {
    console.log("listening on 8080")
})