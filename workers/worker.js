self.importScripts(
	'../search-algorithms/binary.js',
	'../search-algorithms/exponential.js', 
	'../search-algorithms/interpolation.js', 
	'../search-algorithms/jump.js',
	'../search-algorithms/sequential.js'
	)

self.onmessage = event => {
	const workerName = event.data.workerName;
	const items = event.data.items;
	const firstAlgorithmOnQueue = event.data.algorithm;

	const startTime = Date.now();
	switch (firstAlgorithmOnQueue) {
		case 'binary':
			binarySearch(items, 4283);
			break;
		case 'exponential':
			exponentialSearch(items, 4283);
			break;
		case 'interpolation':
			interpolationSearch(items, 4283);
			break;
		case 'jump':
			jumpSearch(items, 4283);
			break;
		case 'sequential':
			sequentialSearch(items, 4283);
			break;
	}
	const duration = (Date.now() - startTime);
	console.log(`Worker finished: function ${firstAlgorithmOnQueue.toUpperCase()} | worker ${workerName.toUpperCase()} | duration: ${duration} ms`);
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
