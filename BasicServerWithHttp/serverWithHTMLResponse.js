const http = require('http')
const fs = require('fs').promises

const htmlServer = http.createServer(async (req, res) => {
    try{
        const data = await fs.readFile('./ex.html')
        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
        res.end(data)
    }catch(err){
        console.error(err);
        res.writeHead(500,{'Content-Type' : 'text/html;charset=utf-8'});
        res.end(err.message);
    }
})

htmlServer.on('listening',() => {
    console.log('Listening on 8010 port')
})
htmlServer.listen(8010)