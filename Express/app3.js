const express = require('express')


const app = express()
app.set('port',3000)

const a = 10
const b = 10
console.log(a === b)
console.log(a >= b)
console.log(a <= b)
console.log(a != b)

app.get('/',(req,res) => {
    res.send("<h2>hello world</h2>")
})

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`)
    
})