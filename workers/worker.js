self.onmessage = event => {
	const workerName = event.data.workerName;
	const items = event.data.items;
	const firstAlgorithmOnQueue = event.data.algorithm;

	const startTime = Date.now();
	switch (firstAlgorithmOnQueue) {
		case 'one':
			one(items);
			break;
		case 'two':
			two(items);
			break;
		case 'three':
			three(items);
			break;
		case 'four':
			four(items);
			break;
		case 'five':
			five(items);
			break;
	}
	const duration = (Date.now() - startTime) / 1000;
	console.log(`Worker finished: function ${firstAlgorithmOnQueue.toUpperCase()} | worker ${workerName.toUpperCase()} | duration: ${duration} s`);
	self.postMessage(firstAlgorithmOnQueue);
};

function one(array) {
	console.log('ONE:', array.join('*'));
	let x = 0;
	for (let i = 0; i < 700000000; i++) {
		x = x + i;
	}
}

function two(array) {
	console.log('TWO:', array.join('|'));
	let x = 0;
	for (let i = 0; i < 700000000; i++) {
		x = x + i;
	}
}

function three(array) {
	console.log('THREE:', array.join('.'));
	let x = 0;
	for (let i = 0; i < 700000000; i++) {
		x = x + i;
	}
}

function four(array) {
	console.log('FOUR:', array.join('-'));
	let x = 0;
	for (let i = 0; i < 700000000; i++) {
		x = x + i;
	}
}

function five(array) {
	console.log('FIVE:', array.join(';'));
	let x = 0;
	for (let i = 0; i < 700000000; i++) {
		x = x + i;
	}
}
