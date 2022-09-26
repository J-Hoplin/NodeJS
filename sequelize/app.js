const express = require('express')
const path = require('path')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')

// Sequelize Model
const { Op } = require('sequelize')
const { Comment } = require('./models/comment')
const { User } = require('./models/users')

dotenv.config()
const { sequelize } = require('./models')

const app = express()
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'njk');
nunjucks.configure('views',{
    express: app,
    watch: true
})

// sync 메소드를 통해서 서버 실행시 MySQL과 연결한다.
// force를 true로 설정하면 서버 실행시마다 테이블을 재생성한다.
sequelize.sync({force: false})
.then(() => {
    console.log("DB Successfully connected")
})
.catch((err) => {
    console.error(err)
})

app.use(process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('combined'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', async (req,res) => {
    // raw : true를 해주어야 순수 데이터만 추출
    const a = await User.findAll({
        raw: true
    });
    console.log(a)
    return res.status(200).send(`${a}`)
})

/**
 * 데이터를 하나만 가져올때는 findOne메소드를, 여러개 가져올때는 findAll 메소드를 사용한다.
 * 
 * attributes 옵션을 통해 원하는 컬럼만 가져올 수 도 있다.
 */

app.get('/getuser', async(req,res) => {
    const { username:name } = req.query
    const result = await User.findOne({
        where: {
            name
        }
    })
    return res.send(result)
})

app.post('/create-user',async(req,res) => {
    try{
        const {
            name,
            age,
            married,
            comment
        } = req.body
        await User.create({
            name,
            age,
            married,
            comment
        })
        return res.status(200).json({
            "code" : 200,
            "message" : "Success"
        })
    }catch(err){
        return res.status(500).json({
            "code" : 500,
            "message" : err.message
        })
    }
})

app.get('/optest1',async(req,res) => {
    const result = await User.findAll({
        raw: true,
        attributes: ["id", "name","married","age"],
        where: {
            [Op.or] : [
                {married: false},
                {age: {
                    [Op.gt] : 30
                }}
            ]
        }
    })
    return res.status(200).json(result)
})

// 정렬을 위해서는 Order 옵션을 사용한다. 배열 안에 배열에 있는데, 이 이유는 정렬을 컬럼 하나가 아닌 여러개로할 수 있기 때문이다.
// limit: 총 몇개를 가져올것인지 정한다
app.get('/optest2', async(req,res) => {
    const result = await User.findAll({
        order: [['age','DESC']],
        limit: 3
    })
    return res.status(200).json(result)
})

app.get('/optest2-1',async(req,res) => {
    const result = await User.findAll({
        order: [['age','DESC']]
    })
    return res.json(result)
})

// offset 옵션을 줄 수 도 있다. offset은 n번째 행 이후부터 검색할지를 정해줄 수 있다.
app.get('/optest3',async(req,res) => {
    const result = await User.findAll({
        order: [['age','DESC']],
        offset: 2
    })
    return res.json(result)
})

app.get('/find-married',async(req,res) => {
    try{
        // attributes : 

        const { age } = req.query
        const result = await User.findOne({
            attributes: ['name','age','comment','married'],
            where: {
                age: {
                    [Op.gte] : age
                }
            }
        })
        return res.status(200).json({
            "code" : 200,
            "ip" : req.ip,
            "message" : result
        })
    }catch(err){
        return res.status(500).json({
            "code" : 500,
            "message" : err.message
        })
    }
})

// 전체 필드를 가져온다.
app.put('/update',async(req,res,next) => {
    const {
        name,
        age,
        married,
        comment
    } = req.body
    // Find user by name : name is unique key
    const findUser = await User.findOne({
        raw: true,
        where: {
            name
        }
    })
    if(!findUser){
        const err = new Error("User not found")
        err.status = 500
        next(err)
    }
    console.log(findUser)
    await User.update({
        age: age ? age : findUser.age,
        married : married ? married : findUser.married,
        comment : comment ? comment : findUser.comment
    },{
        where: {
            name
        }
    })
    return res.json({
        "code" : 200,
        "message" : "Success"
    })
})

// 쿼리를 수정해 보자, 일부만 수정하므로 HTTP Method PATCH에 해당한다
// (Model).update()를 해주면된다
// 첫번째 인자는 수정할 내용이고 두번째 인수는 어떤 로우를 수정할지에 대한 조건이다
app.patch('/update-comment',async(req,res) => {
    try{
        const {
            name,
            comment
        } = req.body
        const findUser = await User.findOne({
            where: {
                name
            }
        })
        if(!findUser){
            throw Error()
        }

        // 만약 일치하는 유저가 없어도 성공한 것으로 반환한다.
        // Select문 같은 경우에는 못찾는 경우 오류를 반환하므로, 우선 findOne을 통해 User의 존재 여부를 확인한다.
        const result = await User.update({
            comment
        },{
            where: {
                name
            }
        })
        console.log(result)
        return res.json({
            "code" : 200,
            "message" : "Success"
        })
    }catch(err){
        return res.json({
            "code" : 500,
            "message" : "Failed"
        })
    }
    
})

// delete 메소드를 통해서 row를 삭제한다. where 옵션으로 조건들을 적는다
app.delete('/delete-row',async(req,res,next) => {
    const {
        name
    } = req.body

    const findUser = await User.findOne({
        where: {
            name
        }
    })
    // 에러처리 미들웨어 활용연습
    if(!findUser){
        const err = new Error("Logic Error")
        err.status = 500;
        next(err)
    }
    const result = await User.destroy({
        where: {
            name
        }
    })
    return res.json({
        "code" : 200,
        "message" : "Success"
    })
})

app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} router not found`)
    error.status = 404;
    next(error)
})

app.use((err,req,res,next) => {
    // for nunjucks
    //res.locals.message = err.message;
    //res.locals.error = process.env.NODE_ENV === 'development' ? err : {}
    return res.json({
        "code" : err.status,
        "message" : err.message
    })
})

app.listen(app.get('port'),() => {
    console.log(`Listening on port ${app.get('port')}`)
})