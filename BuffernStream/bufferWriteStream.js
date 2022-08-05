// 이번에는 파일을 작성해 보는 Stream을 생성해보자.

const fs = require('fs')

const writeStream = fs.createWriteStream('./writestreamtest.txt')

writeStream.on('finish', () => {
    console.log("Complete to write file")
})

writeStream.on('error', (err) => {
    console.error(err)
})

writeStream.write("write this texts\n")
writeStream.write("Write again")
// writeStream.write(new Error()) //이러한 형태의 에러 전달은 불가능하다. write에는 string 이나 byte64만 가능하다.
writeStream.end()
