/**
 * timer : setTimeout, setInterval, setImmediate -> globalr객체 안에 들어있다.
 *
 * setTimeout : 주어진 초가 지난 후 콜백함수를 실행한다.
 * setInterval : 주어진 밀리초마다 콜백함수를 반복실행한다
 * setImmediate : 콜백함수를 즉시 실행한다.
 *
 * clearTimeout : setTimeout취소
 * clearInterval : setInterval 취소
 * clearImmediate : setImmediate 취소
 */

const timeout = setTimeout(() => {
    console.log("after 1.5sec")
},1500)

const interval = setInterval(() => {
    console.log("Per 1sec")
},1000)

const timeout2 = setTimeout(()=>{
    console.log("Not executed")
},3000)

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval)
},2500)

const immediate = setImmediate(() => {
    console.log("Immediately Execute")
})

const immediate2 = setImmediate(() => {
    console.log("Not executed Immediate2")
})

clearImmediate(immediate2)