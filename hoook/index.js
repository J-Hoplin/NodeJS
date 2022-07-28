const axios = require('axios')
const config = require('./config.json')

const errorCodes = {}

const request = async () => {
    const now = new Date();
    const dateBefore2day = `${now.getFullYear()}0${now.getMonth()+1}${now.getDate() - 2}`
    const dateToday = `${now.getFullYear()}0${now.getMonth()+1}${now.getDate() + 1}`
    const reqParam = {
        ServiceKey: config.serviceKey,
        pageNo: 1,
        numOfRows: 10,
        startCreateDt: dateBefore2day,
        endCreateDt: dateToday
    }
    try{
        const apiReq = await axios.get(`${config.url}?${new URLSearchParams(reqParam).toString()}`)
        const result = apiReq.data.response.body.items.item
        // Check result length - Normal : upper than 2, Abnormal : lower than 2
        result.length < 2 ? (() => {throw new Error()})() : true
        const [ today, yesterday ] = result.slice(0,2)
        
        // today
        const todayDate = today.createDt.split(' ')[0]
        const todayDecided = today.decideCnt
        // yesterday
        const yesterdayDate = yesterday.createDt.split(' ')[0]
        const yesterdayDecided = yesterday.decideCnt
        // comparison
        const increasement = parseInt(todayDecided) - parseInt(yesterdayDecided)
        
        const txtMSG = `${todayDate} 코로나 19 현황\n전체 확진자 수 : ${todayDecided}명\n전날(${yesterdayDate}) 대비 확진자 증가 : ${increasement}명`
        console.log(txtMSG)
        return {
            text: txtMSG
        }
    }catch(err){
        return {
            text: txtMSG
        }
    }
}

const a =(async() => await request())()
console.log(a)
