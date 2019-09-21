self.onmessage = event => {  
  const items = event.data.items
  const firstAlgorithmOnQueue = event.data.algorithm

  switch (firstAlgorithmOnQueue) {
    case 'one':
      one(items)
      break
    case 'two':
      two(items)
      break
    case 'three':
      three(items)
      break
    case 'four':
      four(items)
      break
    case 'five':
      five(items)
      break
  }
  // Send data to worker onmessage
  self.postMessage(`>>>>>>>>>>>>>>>>>>>>> FISNISHED ${firstAlgorithmOnQueue}`)
}


function one(array) {
  console.log("================= ONE =================")
  console.log(array.join('>>>>'))
  let x = 0
  for(let i= 0; i < 500000000; i++) {
    x = x + i
  }
}

function two(array) {
  console.log("================= TWO =================")
  console.log(array.join('||||'))
  let x = 0
  for(let i= 0; i < 500000000; i++) {
    x = x + i
  }
}

function three(array) {
  console.log("================= THREE =================")
  console.log(array.join('?????'))
  let x = 0
  for(let i= 0; i < 500000000; i++) {
    x = x + i
  }
}

function four(array) {
  console.log("================= FOUR =================")
  console.log(array.join('----'))
  let x = 0
  for(let i= 0; i < 500000000; i++) {
    x = x + i
  }
}

function five(array) {
  console.log("================= FIVE =================")
  console.log(array.join(';;;;'))
  let x = 0
  for(let i= 0; i < 500000000; i++) {
    x = x + i
  }
}