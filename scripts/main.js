const runWorker = (worker, workerName, items) => {
	let algorithm = searchAlgorithms.pop();
	worker.postMessage({ items, algorithm, workerName});
	worker.onmessage = event => {
		if (searchAlgorithms.length === 0) {
			//worker.terminate();
		} else {
			algorithm = searchAlgorithms.pop();
			worker.postMessage({ items, algorithm, workerName});
		}
	}
};

let searchAlgorithms = [
	'binary',
	'exponential', 
	'interpolation',
	'jump',
	'sequential'
];

const worker1 = new Worker('../workers/worker.js?name=Worker1');
const worker2 = new Worker('../workers/worker.js?name=Worker2');

runWorker(worker1, 'worker_1', data.integers);
runWorker(worker2, 'worker_2', data.integers);
