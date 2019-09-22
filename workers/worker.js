self.importScripts(
	'../search-algorithms/binary.js',
	'../search-algorithms/exponential.js',
	'../search-algorithms/interpolation.js',
	'../search-algorithms/jump.js',
	'../search-algorithms/sequential.js'
);

self.onmessage = event => {
	const workerName = event.data.workerName;
	const items = event.data.items;
	const firstAlgorithmOnQueue = event.data.algorithm;
	let result = null;

	const startTime = Date.now();
	switch (firstAlgorithmOnQueue) {
		case 'binary':
			result = binarySearch(items, 440547);
			break;
		case 'exponential':
			result = exponentialSearch(items, 440547);
			break;
		case 'interpolation':
			result = interpolationSearch(items, 440547);
			break;
		case 'jump':
			result = jumpSearch(items, 440547);
			break;
		case 'sequential':
			result = sequentialSearch(items, 440547);
			break;
	}
	const duration = (Date.now() - startTime);
	console.log(`Worker finished: algorithm ${firstAlgorithmOnQueue.toUpperCase()} | worker ${workerName.toUpperCase()} | duration: ${duration} ms`);
	const messageTxt = result === -1 ? 'Element it not present in array.' : `Element is found on index: ${result}`;
	console.log(`algorithm ${firstAlgorithmOnQueue.toUpperCase()}`, messageTxt);
	self.postMessage(firstAlgorithmOnQueue);
};
