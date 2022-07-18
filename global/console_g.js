
// 배열 요소로 객체 리터럴을 넣으면 표 형식으로 추력해줌
console.table([{name:"hi",birth:1999},{name:"hi2",birth:2000}])


// 에러를 추적하게 해준다.
function b(){
    console.trace("Error trace")
}

function a(){
    b();
}

a();
