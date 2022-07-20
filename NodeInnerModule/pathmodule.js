/**
 * path : 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈이다.
 * 
 */

const path = require('path')

const file_path = __filename
const folder_path = __dirname

console.log(`${file_path} ${folder_path}`)
console.log(`path.sep : ${path.sep}`) // 경로 구분자이다. 운영체제에 따라 반환값이 다름

console.log(`path.dirname : ${path.dirname(file_path)}`) // path.dirname : 파일이 위치한 폴더 경로를 보여준다
console.log(`path.extname : ${path.extname(file_path)}`) // 파일의 확장자를 보여준다.
console.log(`path.basename : ${path.basename(file_path)}`) // 확장자가 포함된 파일 이름을 보여준다
console.log(`path.basename with parameter : ${path.basename(file_path,path.extname(file_path))}`) // 두번째 인자 확장자를 넘겨주면, 확장자를 제외한 이름만 보여준다. 만약 다른 확장자가 들어가면, 파일이름, 확장자 모두 출력한다.

console.log(`path.isAbsolute : ${path.isAbsolute('/Users/hoplin/nodejs/NodeJS')}`) // 경로가 절대경로인지 판별해준다.
console.log(`path.isAbsolute : ${path.isAbsolute('./home')}`)

console.log(`path.join : ${path.join('/Users/hoplin/nodejs','NodeJS')}`) // 경로를 합친다.