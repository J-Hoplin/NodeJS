const url = require('url') // url모듈안에 URL생성자가 있다.


const { URL } = url

const testURL = new URL('https://www.gilbut.co.kr/book/view?bookcode=BN003474')
console.log(`new URL() : ${testURL}`)

const parsedURL = url.parse('https://www.gilbut.co.kr/book/view?bookcode=BN003474') // url.parse : 주소를 분해한다.
console.log(`url.parse() : ${parsedURL}`)
console.log(`url.format() : ${url.format(parsedURL)}`) // format : 분해되었던 url객체를 원래 상태로 조합한다.ㅍ


const myURL = new URL('https://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript')

console.log(`searchParams : ${myURL.searchParams}`);
console.log(`searchParams.getAll() : ${myURL.searchParams.getAll('category')}`)
console.log(`searchParams.get() : ${myURL.searchParams.get('category')}`) // 동일한 파라미터에 여러개가 있으면 가장 먼저 발견되는것을 반환한다.
