/**
 * 
 * createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓸 수 있다.
 * 파일 복사와 비슷하며, 스트림끼리 연결하는것을 파이핑이라고 부른다.
 * 
 */

const fs = require('fs')

const readStream = fs.createReadStream('./streamtest.txt')
const writeStream = fs.createWriteStream('./pipelinetest.txt')
readStream.pipe(writeStream)

// streamtest와 동일한 내용의 텍스트가 pipelinetest텍스트에 생긴것을 볼 수 있다.
// pipe 는 스트림 사이에 여러번 연결할 수 있다.
const readStream2 = fs.createReadStream('./streamtest.txt')
const zlib = require('zlib')
const zlibStream = zlib.createGzip() // createGzip은 스트림을 지원한다.
const writeStream2 = fs.createWriteStream('./pipelinetest2_txt.gz')
readStream.pipe(zlibStream).pipe(writeStream2)