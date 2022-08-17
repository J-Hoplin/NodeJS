const express = require('express')

const router = express.Router()


// Query String은 req.query에서 볼 수 있다.
router.get('/normalqs',(req,res) => {
    console.log(req.params,req.query)
    return res.status(200).send("<h1>OK</h1>")
})
/**
 * 라우터 주소에 정규표현식을 비롯한 특수 패턴을 사용할 수 있다.
 * 이는 route 매개변수 라고 불리는 패턴이다.
 * 
 * 이 id 부분에는 다른 값을 넣을 수 도 있다. :id에 해당하는 값들은 req.params 객체 안에 들어있으며
 * :id이므로, req.params.id로 접근할 수 있으며
 * 
 * :type인 경우에는 req.params.type으로 접근할 수 있다.
 * 
 * 이러한 패턴의 주의점은 일반 라우터보다 뒤에 있어야 한다는 점이다. 와일드 카드 역할을 하기때문에, 다른 라우터를 방해할 수 도 있다.
 * 
 * 
 * 주소에 QueryString을 쓸 때도 있다.(GET 요청을 말하게 된다.) 이때는 req.query객체 안에서 볼 수 있다.
 */
router.get('/:id', (req,res) => {
    console.log(req.params, req.query)
    return res.send("<h1>OK</h1>")
})

router.get('/:id/:type',(req,res) => {
    console.log(req.params, req.query)
    return res.send("<h1>OK</h1>")
})
module.exports = router