const express = require('express')
const path = require('path')

const app = express()
app.set('port', process.env.PORT || 3000)


// res.sendFile()을 이용해서 html 파일을 보낼 수 있으며, 이는 path모듈을 사용해서 파일 경로를 지정하여 보내야한다.
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/test.html'))
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`)
})