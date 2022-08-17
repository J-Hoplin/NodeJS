const express = require('express')
const { route } = require('.')
const router = express.Router()

/**
 * 일반적으로 라우터를 작성할 때 app.route 혹은 router.route형식으로 사용한다
 * 
 * 아래같은 경우에는 서로 endpoint는 같지만, 다른 HTTP Method를 가지고 있다.
 * 
 */

/*
router.get('/test',(req,res) => {
    return res.send('GET /test')
})

router.post('/test',(req,res) => {
    return res.send('POST /test')
})*/

// 위 코드와 같이 연관있는 코드는 아래와 같이 묶어줄 수 있다.
// router객체의 route()를 사용한단
router.route('/test')
.get((req,res) => {
    return res.send('GET /test')
})
.post((req,res) => {
    return res.send('POST /test')
})

module.exports = router
