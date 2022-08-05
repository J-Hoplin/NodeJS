/**
 * 
 * Node js는 대부분 비동기 방식으로 함수를 작동시킨다.
 * 몇몇 메소드는 동기 방식으로도 사용할 수 있다. fs모듈이 그러한 메소드를 많이 가지고 있다.
 * 
 */

const fs = require('fs')

console.log('start')

// 기본적으로 readFile()은 비동기적으로 실행되게 된다.(논 블로킹)
// 비동기 메소드는 백그라운드에 해당 파일을 읽으라고 요청하고 다음 작업으로 넘어간다.
// 만약 읽기가 끝나면, 메인쓰레드에 알리고, 메인 스레드는 등록된 콜백함수를 실행하게 된다.
// 아래 예제는 실행 순서가 보장되지 않는다.

const txt_location = './example_files/readme.txt'
fs.readFile(txt_location,(err,data) => {
    if(err){
        throw err;
    }
    console.log(`1번 ${data.toString()}`)
})

fs.readFile(txt_location,(err, data) => {
    if(err){
        throw err;
    }
    console.log(`2번 ${data.toString()}`)
})

fs.readFile(txt_location,(err,data) => {
    if(err){
        throw err;
    }
    console.log(`3번 ${data.toString()}`)
})

console.log('end')
