/***
 * fs 모듈은 파일 시스템에 접근하는 모듈이다. 브라우저 자바스크립트에서는 사실상 파일시스템 접근이 불가능하다. 
 */

const fs = require('fs')

fs.readFile('./example_files/readme.txt',(err,data) => {
    if(err){
        throw err;
    }
    console.log(data) // Buffer라는것이 출력된다. readFile의 결과물은 Buffer라는 형식으로 제공된다. 우선 단순히 메모리의 데이터라고 생각하면 된다
    console.log(data.toString()) // toString()을 통해 Buffer를 String으로 변환하는 것이다.
    // fs는 기본적으로 콜백형식의 모듈이다. 그렇기 때문에 사용하기 불편할 수 있다.
})