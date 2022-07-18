/**
 * 
 * setTimeout : 주어진 시간 이후에 콜백함수 실행(1회만)
 * setInterval : 주어진 밀리초마다 콜백함수를 반복실행한다
 * setImmediate : 콜백함수를 즉시 실행한다.
 * 
 * clearTimeout : setTimeout을 취소한다
 * clearInterval : setInterval을 취소한다
 * clearImmediate : setImmediate를 취소한다
 * 
 */


const timeout = setTimeout(() => {
    console.log("after 1.5sec")
},1500);

const interval = setInterval(() => {
    console.log("after 1sec")
},1000)

const timeout2 = setTimeout(() => {
    console.log("Not executed")
},3000)

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval)
},2500)


const immediate = setImmediate(() => {
    console.log("Immediately execute")
})

const immediate2 = setImmediate(())