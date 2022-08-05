const fs = require('fs')

/**
 * 
 * 동기적인 방법으로 파일을 읽어보자(블로킹)
 * readFileSync()를 사용하면 된다.
 */

const textfilePath = './example_files/readme.txt'

// readFileSync를 하게되면 수백게 요청이 들어오는경우 성능에 문제가 생긴다. 메인쓰레드가 아무것도 못하고 대기하고 있어야 하기 때문이다.
console.log('start')
let data = fs.readFileSync(textfilePath)
console.log(`No.1 ${data.toString()}`)
data = fs.readFileSync(textfilePath)
console.log(`No2 ${data.toString()}`)
data = fs.readFileSync(textfilePath)
console.log(`No3 ${data.toString()}`)
console.log('end')