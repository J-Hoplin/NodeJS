/**
 * 폴더 내용 확인 및 삭제와 관련된 메소드를 알아보자
 * 
 * 
 * fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인할 수 있다. 배열 안에 내부 파일과 폴더명이 나온다.
 * 
 * fs.unlink(경로, 콜백) : '파일'을 지울 수 있다. 파일이 없다면, 에러가 발생하므로, 파일이 있는지부터 확인해야한다
 * 
 * fs.rmdir(경로, 콜백) : 폴더를 지울 수 있다. 폴더 안에 파일이 있으면 에러가 발생하기에, 먼저 내부 파일을 모두 지우고 호출해야한다.
 * 
 * 
 * 노드 8.5 이후부터는 createWriteStream / createReadStream간의 pipe 필요 없이 파일을 복사할 수 있다.
 * copyFile()을 사용하여 파일 복사를 해결할 수 있다.
 * 
 * 
 */

const fs = require('fs').promises

const path = './folder'

fs.readdir(path)
.then((dir) => {
    console.log("Check dir content ", dir)
    return fs.unlink('./folder/newfile.js')
})
.then(() => {
    console.log('Complete to remove file')
    return fs.rmdir(path)
})
.then(() => {
    console.log("Complete to remove folder")
})
.catch((err) => {
    console.error(err)
})

fs.copyFile('writeme2.txt','writeme3.txt')
.then(() => {
    console.log("복사 완료")
})
.catch((err) => {
    console.error(err)
})