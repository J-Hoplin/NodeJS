const fs = require('fs').promises
const path = require('path')
const constants = require('fs').constants

/**
 * 네가지 메소드를 살펴보자. 모두 비동기 메소드이므로 한 메소드 콜백에서 다른 메소드를 호출한다.
 * 
 * fs.access(경로, 옵션, 콜백) : 폴더나 파일에 접근할 수 있는지 체크한다. 두번째 인수로 상수들을 넣는다.(constants를 통해.)
 * - F_OK : 파일의 존재 여부
 * - R_OK : 읽기 권한 여부
 * - W_OK : 쓰기 권한 여부
 * 파일 폴더나 권한이 없으면 에러가 발생하는데 에러 코드는 ENOENT이다.
 * 
 * fs.mkdir(경로, 콜백) : 폴더를 만드는 메소드이다. 폴더가 있다면, 에러가 발생하므로, access메소드를 호출해 확인하는것이 좋다.
 * 
 * fs.opne(경로, 옵션, 콜백) : 파일의 id를 가져오는 메소드이다. 파일이 없다면, 생성한 뒤 그 아이디를 가져온다. 가져온 아이디로 fs.write/ fs.read를 할 수 있다.
 * 두번째 인자로 어떤 동작을 할 수 있는지를 설정할 수 있다. w : write, r : read, a : 기존 파일 추가
 * 아래 예시에서는 w를 했기 때문에 새로 생성하였지만, r로 하였다면, 오류가 났을것이다.
 * 
 * fs.rename(기존 경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메소드이다. 파일의 새로운 위치를 적으면 해당 위치로 파일이 이동한다. 
 * 
 */

const basicPath = './folder'

fs.access(basicPath,constants.F_OK | constants.W_OK | constants.R_OK)
.then(() => {
    return Promise.reject("이미 폴더 있음")
})
.catch((err) => {
    if(err.code === "ENOENT"){
        console.log("Directory not exist")
        return fs.mkdir(basicPath)
    }
    return Promise.reject(err)
})
.then(() => {
    console.log("폴더 만들기 성공")
    return fs.open(path.join(basicPath,'file.js'),'w')
})
.then((fd) => {
    console.log("빈 파일 만들기 성공 : ", fd)
    return fs.rename(path.join(basicPath,'file.js'),path.join(basicPath,'newfile.js'))
})
.then(() => {
    console.log("이름 바꾸기 성공")
})
.catch((err) => {
    console.error(err)
})