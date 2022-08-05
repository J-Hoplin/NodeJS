/**
 * 
 * watch는 파일/폴더의 변경사항을 감시할 수 있는 메소드이다. 
 * 
 * 파일명이 삭제되거나 변경하게 되면 더이상 수행되지 않는다. 
 * change이벤트가 두번씩 발생하기도 하므로 주의가 필요하다.
 * 
 */

const fs = require('fs')

fs.watch('./writeme.txt',(eventType, filename) => {
    console.log(eventType, filename)
})
