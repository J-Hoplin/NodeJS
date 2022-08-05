/**
 * 버퍼의 문제점 또한 존재한다.
 * 만약 100mb의 파일이 있을때 메모리는 100mb의 버퍼를 만들어야 한다. 만약 사용자가 많아지게 되면, 이는 메모리 문제를 발생시킬 수 있다.
 * 그렇기 때문에, 버퍼의 크기를 작게 만든 후 여러번 나눠 보내는 방식이 나온다. 예를 들어 100mb를 1mb로 나눠 100번보내는 것이다.
 * 
 * 이를 편하게 만든것이 바로 stream이다.
 * 
 * 파일을 읽는 스트림 메소드로는 createReadStream이 있다.
 * 스트림은 파일을 나누어서 보내게 되는데, 이 나누어진 단위를 chunk라고 한다.
 */

const fs = require('fs')

// 첫번째 인수는 읽고자 하는 파일 경로를 넣는다. 두번째 인수는 옵션객체인데, highwatermark는 버퍼의 크기를 정할 수 있는 옵션이다.
// 기본값은 64kb이며, 여기서는 16b로 설정하였다.
const readStream = fs.createReadStream('./streamtest.txt',{highWaterMark:16})
const data = new Array()

/**
 * readStream은 주로 이벤트 리스너를 붙여서 사용한다. 보통 data, end, error이벤트를 사용한다.
 * 
 * 파일 읽기가 시작되면, data이벤트가 발생하고, 다 읽으면 end가, 오류가 발생하면 error 이벤트가 발생된다.
 * 
 */

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log("data : ",chunk, chunk.length)
})

readStream.on('end', () => {
    console.log("end : ", Buffer.concat(data).toString())
})

readStream.on('error', (err) => {
    console.log('error : ', err)
})