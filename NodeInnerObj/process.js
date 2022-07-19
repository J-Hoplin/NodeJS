/**
 * process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고있다.
 * 
 * process 객체 안에 다양한 속성이 존재한다.
 * 
 * 
 */

console.log(process.version) // 노드버전
console.log(process.arch) // 아키텍쳐 정보
console.log(process.platform) // OS platform info
console.log(process.pid) // process id
console.log(process.uptime()) // after time process started (second)
console.log(process.execPath) // Node path
console.log(process.cwd()) // process execution location
console.log(process.cpuUsage()) // CPU Usage

// process.env : 시스템 환경변수들을 조회한다.
console.log(process.env)

// 중요한 값을 아래와 같이 환경변수에 임의의 값을 저장할 수 도 있다.
process.env.secretKey = "Test Key"
console.log(process.env.secretKey)

/* process.nextTick : 다른 콜백함수보다 nextTick의 콜백함수를우선 처리하도록 만든다

process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.
Promise또한 resolve된것에 대해 다른 콜백(timer들) 보다 우선시 된다

이러한 nextTick,Promise를 마이크로 태스크라고 따로 구분지어서 부른다. 마이크로 태스크는 일반적인 콜백보다 먼저 실행된다.

*/

setImmediate(() => {
    console.log("immediate")
});

process.nextTick(() => {
    console.log("nextTick")
})

setTimeout(() => {
    console.log('timeout')
},0)
Promise.resolve().then(() => console.log("promise"))

// process.exit : 실행중인 노드 프로세스를 종료한다.
// 매개변수로 코드 번호를 줄 수 있다.

// 인수를 주지 않거나 0을 주었을 경우 : 정상종료
// 1을 인수로 주었을 경우 : 비정상 종료

const testArray = [1,2,3,4,5]

setImmediate(() => {
    for(const a of testArray){
        a === 3 ? (() => {console.log("End process!");process.exit();})() : console.log(a)
    }
})