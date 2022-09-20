const express = require('express')
const nunjucks = require("nunjucks")

const router = express.Router()


// app.js nunjucks configure에 views로 설정하였기 때문에 
router.get('/',(req,res,next) => {
    // res.render호출시 보내는 변수를 넌적스가 처리를 한다.
    return res.render('./index.njk',{
        title:'Express'
    })
})

router.get('/practice',(req,res,next) => {
    return res.render('./practice.njk',{
        title: 'Main title',
        subtitle: 'Subtitle'
    })
})

// include는 주로 함께 재사용되는 코드들을 주로 넣는다
router.get('/includes',(req,res,next) =>{
    return res.render('./include.njk')
})

/**
 * block은 여러개를 만들 수 있다.
 * 
 * block 선언방법은 {% block [블록명] %} dlek.
 * 
 */
router.get('/extends',(req,res,next) => {
    return res.render('./extend.njk',{
        title: "Title from layout"
    })
})

router.get('/iferror',(req,res,next) => {
    const loggedin = true
    if(loggedin){
        return res.render('./iferrors/index.njk',{
            title: 'If error',
            isloggedIn : true,
            username: 'hoplin'
        })
    }else{
        return res.render('./iferrors/index.njk',{
            title: 'If error',
            isloggedIn : false
        })
    }
})

module.exports = router