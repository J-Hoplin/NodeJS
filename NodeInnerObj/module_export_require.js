/**
 * 
 * module.exports로만 모듈을 만들었지만, module객체 말고 exports객체로도 모듈을 만들 수 있다.
 * module.exports로 한번에 대입하였지만, exports객체로 하나씩 넣을 수 있다.
 * 
 * 
 * module.exports와 exports가 동일한 객체를 참조한다. 
 * 실제로 module.exports === exports는 동일한 객체로 반환한다.
 * 
 * 
 * 주의할 점은 module.exports로 한번에 반환하는 방식과 exports로 반환하는것을 동시에 사용해서는 안된다. 참조관계에 있어서 영향을 준다.
 * 
 * exports -> module.exports -> {}
 */

const { odd,even,testFunction,function2 } = require('./module_test')

console.log(exports === module.exports) // true
console.log(`${odd} ${even}`)

testFunction()
function2()

/**
 * require : 함수이며, 함수는 객체이므로 require는 객체로서 몇가지 속성을 가지고 있다
 * 
 * - require.cache
 * - require.main
 * 
 */


// require문이 꼭 최상단에 오지 않아도됨
require('./global')

console.log(require.cache)