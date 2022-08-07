const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')

const parseCookies = (cookie = '') => {
    return cookie.split(';')
    .map(v => v.split('='))
    .reduce((acc,[k,v]) => {
        acc[k.trim()] = decodeURIComponent(v)
        return acc
    }, {})
}

const session = {}

http.createServer(async (req,res) => {
    const cookies = parseCookies(req.headers.cookie)
    console.log(cookies)
    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url)
        const { name } = qs.parse(query)
        const expires = new Date();
        // 쿠키 유효 시간을 5분뒤로 설정
        expires.setMinutes(expires.getMinutes() + 5)
        const uniqueInt = Date.now()
        session[uniqueInt] = {
            name,
            expires
        }
        // 302 : redirection
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toUTCString()};HttpOnly; Path=/`
        })
        res.end()
    }
    // 세션에 쿠키가 존재하며, 만료 기간이 지나지 않았을 경우이다.
    else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200,{'Content-Type' : 'text/plain; charset=utf-8' })
        res.end(`${session[cookies.session].name}님 안녕하세요`)
        // 둘다 아닌 경우에는 로그인 페이지로
    }else{
        try{
            const data = await fs.readFile('./cookie.html')
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' })
            res.end(data)
        }catch(err){
            res.writeHead(500,{'Content-Type' : 'text/plain; charset=utf-8' })
            res.end(err.message)
        }
    }
}).listen(8084, () => {
    console.log(`listening on port 8084`)
})