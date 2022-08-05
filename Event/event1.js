/**
 * 
 * Stream을 할때 .on('data',callback) , .on('end',callback) 과 같은 형태를 사용했다.
 * 
 * createReadStream같은 경우에는 내부적으로 data와 end이벤트를 호출한다. 반대로 이벤트를 직접 만들수 도 있다.
 * 
 * events모듈을 사용하면 된다. 
 * 
 * on or addListener (eventname, callback) : 이벤트 이름과 발생시 콜백을 연결한다. 이렇게 연결하는것을 이벤트 리스닝이라고 한다. 하나의 event에 여러 콜백을 연결해줄 수 도 있다.
 * emit(이벤트를 호출하는 메소드이다. 이벤트 이름을 인수로 넣으면 등록한 콜백함수를 실행한다.
 * once(eventname, callback) : 한번만 실행되는 이벤트이다. 여러번 실행되도 최초 한번만 실행된다.
 * 
 * removeAllListeners(eventname) : 이벤트에 연결된 모든 이벤트 리스너를 제거한다.
 * 
 * removeListener(eventname, listener) : 이벤트에 연결된 리스너를 하나씩 제거한다. 리스너를 꼭 명시해 줘야한다.
 * 
 * off(eventname, listener) : removeListener와 동일
 * 
 * listenerCount(eventname) : 현재 리스너가 몇개 연결되어있는지 확인한다.
 * 
 */

const eventEmitter = require('events')


const myEvent = new eventEmitter()

myEvent.addListener('event1', ()=>{
    console.log('event1')
})

myEvent.addListener('event2', () => {
    console.log('event2')
})

myEvent.on('event2', () => {
    console.log('event2 2nd listener')
})

myEvent.once('event3', () => {
    console.log('event3')
})

myEvent.emit('event1')
myEvent.emit('event2');
myEvent.emit('event3')
myEvent.emit('event3')

myEvent.on('event4', () => {
    console.log('event4')
})
myEvent.emit('event4')
myEvent.removeAllListeners('event4')
myEvent.emit('event4')

const listener = () => {
    console.log('event5')
}

myEvent.on('event5',listener);
myEvent.removeListener('event5',listener)
myEvent.emit('event5')

console.log(myEvent.listenerCount('event2'))