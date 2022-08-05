/**
 * 
 * 비동기 방식으로 순서를 지키면서 파일을 읽어보자
 * 단, 여기서는 콜백함수 대신 promise기반의 fs모듈을 사용한다
 * 
 */

const fs = require('fs').promises


const filePath = './example_files/readme.txt'
console.log('시작')
fs.readFile(filePath)
.then((data) => {
    console.log(`No.1 ${data.toString()}`)
    return fs.readFile(filePath)
})
.then((data) => {
    console.log(`No.2 ${data.toString()}`)
    return fs.readFile(filePath)
})
.then((data) => {
    console.log(`No.3 ${data.toString()}`)
    console.log('end')
})
.catch(err => {
    console.error(err)
})

// 위 프로미스 체인 함수를 async/await으로 바꿔보자

const readFilesOrder = async () => {
    try{
        let data = await fs.readFile(filePath);
        console.log(`No1 ${data.toString()}`)
        data = await fs.readFile(filePath);
        console.log(`No2 ${data.toString()}`)
        data = await fs.readFile(filePath);
        console.log(`No3 ${data.toString()}`)
        console.log('end')
    }catch(err){
        console.error(err)
    }
}

readFilesOrder()