/**
 * 
 * Node js에서 멀티쓰레드 방식으로 작업하는 방법이다.
 */
const {
    Worker, isMainThread, parentPort
} = require('worker_threads')