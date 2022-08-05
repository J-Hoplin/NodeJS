// fs모듈이 콜백함수라는 특성으로 인해 불편한 점을 프로미스 형태로 바꿔줄 수 있다.
// fs 모듈에서 promises 속성을 불러오면 프로미스 기반의 fs모듈을 사용할 수 있게된다.
// 웬만하면 프로미스 기반의 fs모듈을 사용한다

const fs = require('fs').promises

// writeFile 메소드에 생성될 파일 경로와 내용을 입력한다. 만약 에러가 발생되지 않는다면, 파일 생성 - 읽기 - 출력이 일어나게 된다.
fs.writeFile('./writeme.txt','Text will be written')
.then(() => {
    return fs.readFile('./writeme.txt');
})
.then((data) => {
    console.log(data.toString())
})
.catch((err) => {
    console.error(err)
})


// 프로미스 기반이므로 async await 사용 가능
const test = async () => {
    await fs.writeFile('./writeme2.txt','Text written with async function')
    const data = await fs.readFile('./writeme2.txt')
    console.log(data.toString())
}

test()