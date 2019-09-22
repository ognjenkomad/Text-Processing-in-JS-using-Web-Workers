
function findNumber() {
	const searchField = document.getElementById('search-value')
	const searchValue = parseInt(searchField.value)
	runWorker(worker1, 'worker_1', data.integers, searchValue);
	runWorker(worker2, 'worker_2', data.integers, searchValue);
}

const runWorker = (worker, workerName, items, searchValue) => {
	let algorithm = searchAlgorithms.pop();
	worker.postMessage({ items, algorithm, workerName, searchValue});
	worker.onmessage = event => {
		if (searchAlgorithms.length === 0) {
			//worker.terminate();
		} else {
			algorithm = searchAlgorithms.pop();
			worker.postMessage({ items, algorithm, workerName, searchValue});
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

