/**
 * 파일을 읽고 쓰는 방식에는 두가지 방식이 있다
 * 
 * -버퍼
 * -스트림
 * 
 * 일반적으로 버퍼링이란 영상을 재생할 수 있을때까지 데이터를 모으는 동작이고, 스트리밍은, 방송인의 컴퓨터에서 시청자 컴퓨터로 
 * 영상데이터를 조금씩 전송하는 동작이다. 스트리밍 하는 과정에서 버퍼링을 할 수도 있다.
 * 
 * fs모듈의 readFile로 파일을 읽으면, toString()으로 변환하기 전에는 버퍼 형태로 출력이 된다. 
 * Node js는 파일을 읽을때 메모리에 파일 크기만큼 공간을 마련해두며, 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 한다.
 *
 * Buffer클래스를 사용하면 버퍼를 직접 다룰 수 있다. 
 */

const buffer = Buffer.from('버퍼로 바꾸기')
// from : 문자열을 버퍼로 바꾼다. 참고로 한글은 한 글자당 3바이트 크기를 가진다.
console.log('from() : ',buffer)
// 버퍼의 길이를 구한다.
console.log(`length : ${buffer.length}`)
// toString(buffer) : 버퍼를 다시 문자열로 바꾼다. base64나 hex를 넣으면, 해당 인코딩으로 변환 가능하다.
console.log(`toString() : ${buffer.toString()}`)

const bufferArray = [Buffer.from("띄엄"), Buffer.from("띄엄"), Buffer.from("띄어쓰기")]
// concat(array) : 배열 안에 든 버퍼들을 하나로 합친다
const buffer2 = Buffer.concat(bufferArray)
console.log("concat() : ", buffer2.toString())
// alloc(byte) : 빈 버퍼를 생성한다 바이트를 인수로 넣으면 해당 크기의 버퍼가 생성된다.
const buffer3 = Buffer.alloc(3)
console.log("alloc() : ",buffer3)
