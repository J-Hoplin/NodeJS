const http = require('http')


http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'})
    res.write("<h1>Hello world</h1>")
    res.end("hello server")
}).listen(8082,() => {
    console.log("listening on port 8082")
})

http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
    req.write('<h1>Port 8081</h1>')
    req.end()
}).listen(8081,() => {
    console.log("listening on port 8081")
})