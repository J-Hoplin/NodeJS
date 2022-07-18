/**
 * global : 브라우저의 window와 동일한 전역객체이다.
 *
 * console : 주로 디버깅을 위해서 사용한다.
 */

const string = 'abc';
const number = 1
const boolean = true;
const obj = {
    outside: {
        inside: 'value',
    },
}

// console.time : 대응되어 같은 레이블을 가진 time, timeEnd사이의 시간을 측정해준다.
console.time('timer')

console.log("Normal log")
// console.error : 에러를 콘솔에 표시
console.error("Error msg here")
// console.table : 배열 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테입르 형식으로 표현된다.
console.table([
    {name: "zero", birth: 1994},
    {name: "hoplin", birth: 1999}
])

function b(){
    // 에러가 어디서 발생했는지를 추적해준다.
    console.trace("Error Trace")
}
function a(){
    b()
}
a();

console.timeEnd('timer')