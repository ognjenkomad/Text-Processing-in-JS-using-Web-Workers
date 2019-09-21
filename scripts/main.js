let stack = [
  'one',
  'two',
  'three',
  'four',
  'five'
]

const startTime = new Date().getTime()

const run = function() {
  this.postMessage({items: [1, 2, 3, 4], algorithm: stack.pop() })

// On finish 
  this.onmessage = (event) => {
    console.log(">>>>> returned data", event)
  if (stack.length === 0) {
    const endTime = new Date().getTime()
     console.log("Execution Time: ", Math.round(endTime - startTime) / 1000)
    // this.terminate() 
    } else {
    console.log(">>>>>> new sack", stack);
    this.postMessage({items: [1, 2, 3, 4], algorithm: stack.pop() })
  }
  }
}

const worker1 = new Worker('../workers/worker.js?name=Worker1')
worker1.run = run
worker1.run()
const worker2 = new Worker('../workers/worker.js?name=Worker2')
worker2.run = run
worker2.run()
