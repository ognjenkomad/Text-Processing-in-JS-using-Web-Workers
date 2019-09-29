const resultList = document.getElementById('result');
const students = data.students;
const searchAlgorithms = [
		'binary',
		'exponential',
		'interpolation',
		'jump',
		'sequential'
];
let algorithmsQueue = [];

function findNumber() {
	algorithmsQueue = [...searchAlgorithms];
	resultList.innerHTML = '';
	const searchField = document.getElementById('search-value');
	const searchValue = parseInt(searchField.value);
	runWorker(worker1, 'worker_1', students, searchValue);
	runWorker(worker2, 'worker_2', students, searchValue);
}

function logAlgorithmResult(resultData) {
	let resultMessage = `Algorithm ${resultData.algorithm.toUpperCase()} | ${resultData.workerName.toUpperCase()} | Duration ${resultData.duration} ms | Result: `;
	if (resultData.result === -1) {
		resultMessage += `Student is not found at index: ${resultData.searchValue}`;
	} else {
		let student = resultData.result;
		resultMessage += `Student is found at index: ${resultData.searchValue}. Name: ${student.firstName} ${student.lastName} Age: ${student.age} Birth Place: ${student.birthPlace}`;
	}
	resultList.innerHTML += `<li>${resultMessage}</li>`;
}

const runWorker = (worker, workerName, items, searchValue) => {
	let algorithm = algorithmsQueue.pop();
	worker.postMessage({ items, algorithm, workerName, searchValue});
	worker.onmessage = event => {
		logAlgorithmResult(event.data);
		if (algorithmsQueue.length === 0) {
			//worker.terminate();
		} else {
			algorithm = algorithmsQueue.pop();
			worker.postMessage({ items, algorithm, workerName, searchValue});
		}
	}
};

const worker1 = new Worker('../workers/worker.js?name=Worker1');
const worker2 = new Worker('../workers/worker.js?name=Worker2');

