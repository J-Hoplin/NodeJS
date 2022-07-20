/**
 * 
 * 
 *  운영체제 관련 정보를 가져오기 위해서 사용한다
 */

const os = require('os')

console.log("OS Information")
console.log(`os.arch : ${os.arch()}`)
console.log(`os.platform : ${os.platform()}`) // 운영체제 플랫폼, process.platform과 동일
console.log(`os.type : ${os.type()}`) // 운영체제 종류
console.log(`os.uptime : ${os.uptime()}`) // 운영체제 부팅 후 시간
console.log(`os.hostname : ${os.hostname()}`) // 컴퓨터 이름
console.log(`os.release : ${os.release()}`) // 운영체제 버전을 보여준다
console.log("Paths")
console.log(`os.homedir : ${os.homedir()}`) // 홈디렉토리 경로
console.log(`os.tmpdir : ${os.tmpdir()}`) // 임시파일 저장경로
console.log("CPU Information")
console.log(`os.cpus : ${os.cpus()}`) // 컴퓨터 코어 정보를 보여준다 : 배열로 반환
console.log(`os.cpus.length : ${os.cpus().length}`) // 총 코어 개수를 의미
console.log("Memory Info")
console.log(`os.freeme : ${os.freemem()}`) //사용 가능한 메모리 조횐
console.log(`os.totalmem : ${os.totalmem()}`) //  전체 메모리 용량 조회