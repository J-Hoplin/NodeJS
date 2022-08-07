const http = require('http')
const fs = require('fs').promises

// req.method : HTTP 메소드에 대한 구분
// req.url : 요청 주소

/*
* POST, PUT부분에서
* req.on('data'), req.on('end') : 요청 본문에 들어있는 데이터를 꺼내기 위한 작업이다. req, res 또한 내부적으로 stream(readStream, writeStream)으로 구현되어있다
* 그렇기 때문에 요청 / 응답의 데이터가 스트림 형식으로 전달된다. 다만 받은 데이터는 문자열 타입이므로 JSON.parse()과정이 요구된다.
*
*
* */

const defaultPort = 8082

const users = {};

const exampleRestServer = http.createServer(async(req,res) => {
    try{
        console.log(req.method, req.url)
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFront.html')
                res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'})
                return res.end(data)
            }else if(req.url === '/about'){
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                return res.end(data)
            }else if(req.url === "/users"){
                res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'})
                return res.end(JSON.stringify(users))
            }
            // CSS 및 js 파일들 또한 GET 요청에 의해 받아온다
            // 해당 부분을 아래와 같은 로직을 작성하여 파일에서 찾아서 보내도록 처리해 주어야한다
            // 절대로 js,css파일이 자동으로 간다고 생각하지 말것
            try{
                const data = await fs.readFile(`.${req.url}`)
                return res.end(data);
            }catch(err){
                res.writeHead(404,{'Content-Type' : 'text/html; charset=utf-8'})
                res.end("Page not found")
            }
        }else if(req.method === "POST"){
            if(req.url === '/user'){
                let body = ''
                console.log(req)
                req.on('data',(data) => {
                    body += data;
                })
                return req.on('end', () => {
                    console.log('POST 본문(Body) : ', body);
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201) // 201 : 생성됨 이라는 의미를 가진다.
                    res.end("등록 성공")
                })
            }
        }else if(req.method === "PUT"){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2]
                let body = ''
                req.on('data', (data) => {
                    body += data;
                })
                return req.on('end', () => {
                    console.log('PUT 본문(Body) : ',body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users))
                })
            }
        }else if(req.method === "DELETE"){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404)
        return res.end("Page not found")
    }catch(err){
        console.error(err)
        res.writeHead(500,{'Content-Type' : 'text/plain; charset=utf-8'})
        res.end(err.message)
    }
})

exampleRestServer.listen(defaultPort)
exampleRestServer.on('listening', () => {
    console.log(`Listening on ${defaultPort}`)
})