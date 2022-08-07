/**
 * cluster모듈은 기본적으로 싱글 프로세스로 동작하는 노드가 CPU를 모두 사용할 수 있게끔 해주는 모듈이다.
 * 
 * 요청이 많이 들어왔을때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있어, 서버에 무리가 덜 가게끔 처리할 수 있다.
 * 
 * 코어 하나당 노드 프로세스 하나가 돌아가게끔 만드는 방식인데, 여덟개를 실행한다고 꼭 성능이 여덟배가 되는것은 아니다.(멀티코어 관리에 들어가는 비용이 있으므로)
 * 단점으로는 메모리를 공유하지 못한다는 것이다. 이는 세션을 메모리에 저장하는 경우 문제가 되는데 이는 레디스도입 등을 통해서 문제를 해결할 수 있다.
 */

const cluster = require('cluster')
const http = require('http')
const cpuNumbers = require('os').cpus().length

if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디 : ${process.pid}`)
    for(let i = 0; i < cpuNumbers; i+= 1){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal) => {
        console.log(`Worker ${worker.process.pid} exit`)
        console.log('Code : ',code,'Signal : ',signal)
    })
}else{
    http.createServer((req,res) => {
        res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'})
        res.write('<h1>Hello Node</h1>')
        res.end("<p>Hello Cluster</p>")
    }).listen(8086,() => {
        console.log(`listening on port 8086 - PID : ${process.pid}`)
    })
}

