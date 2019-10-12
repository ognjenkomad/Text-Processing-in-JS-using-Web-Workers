const resultTable = $('#result-table')
const tableFooter = resultTable.find('tfoot')

const submitButton = $('#submit-button')
const searchInput = $('#search-input')

const processingSelect = $('#processing-select')
const workerSelectContainer = $('#worker-select-container')
const workerSelect = $('#worker-select')


const students = data.students;
const searchAlgorithms = [
		'binary',
		'exponential',
		'interpolation',
		'jump',
		'sequential'
];

let finishedAlgorithmsCount = 0;
let totalTimeStart = 0;
let algorithmsQueue = [];

// Events
submitButton.on('click', findNumber)
searchInput.on('keypress', (event) => {
	if(event.which == 13) findNumber()
})

processingSelect.on('change', (event) => {
	if (processingSelect.val() == 2) {
		workerSelectContainer.show()
	} else {
		workerSelectContainer.hide()
	}
})



function findNumber() {
	totalTimeStart = Date.now()
	algorithmsQueue = [...searchAlgorithms];
	resultTable.find('tbody').empty()
	const searchValue = parseInt(searchInput.val());
	if (processingSelect.val() == 2) {
		numberOfWorkers = workerSelect.val()
		for (let i = 1; i <= numberOfWorkers; i++) {
			const worker = new Worker(`../workers/worker.js?name=Worker${i}`);
			runWorker(worker, `worker_${i}`, students, searchValue);
		}
	} else {
		runAllAlgorithmsSequenital(students, searchValue)
		appendTableFooter()
	}
}

function logAlgorithmResult(resultData) {
	const workerName = resultData.workerName.toUpperCase()
	const algorithm = resultData.algorithm.toUpperCase()
	const duration = resultData.duration
	const result = resultData.result
	if (result === -1) {
		appendNoDataFound(workerName, algorithm, duration)
	} else {
		appendResultData(workerName, algorithm, duration, result)
	}
}

const appendTableFooter = () => {
	const duration = Date.now() - totalTimeStart

	tableFooter.empty()
	tableFooter.append(`
		<tr class="table-primary">
			<td colspan="8" class="text-right"><b>Total Time:</b> ${duration} ms</td>
		</tr>
	`)
}

const appendNoDataFound = (workerName, algorithm, duration) => {
	resultTable.append(`<tr>
			<td>${workerName}</td>
			<td>${algorithm}</td>
			<td>${duration} ms</td>
			<td class="text-center" colspan='5'>No results found.</td>
		</tr>`)
}

const appendResultData = (workerName, algorithm, duration, result) => {
		resultTable.append(`<tr>
		<td>${workerName}</td>
		<td>${algorithm}</td>
		<td>${duration} ms</td>
		<td>${result.index}</td>
		<td>${result.firstName}</td>
		<td>${result.lastName}</td>
		<td>${result.birthPlace}</td>
		<td>${result.age}</td>
		</tr>`)
}

const runAllAlgorithmsSequenital = (items, searchValue) => {
	searchAlgorithms.forEach(algorithm => {
		const startTime = Date.now()
		const result = window[`${algorithm}Search`](items, searchValue);
		const duration = (Date.now() - startTime)
		if (result === -1) {
			appendNoDataFound('-', algorithm.toUpperCase(), duration)
		} else {
			appendResultData('-', algorithm.toUpperCase(), duration, result)
		}
	});
}

const runWorker = (worker, workerName, items, searchValue) => {
	let algorithm = algorithmsQueue.pop();
	worker.postMessage({ items, algorithm, workerName, searchValue});
	worker.onmessage = event => {		
		finishedAlgorithmsCount ++;
		if (finishedAlgorithmsCount === 5) {
			appendTableFooter()
		}
		logAlgorithmResult(event.data);
		if (algorithmsQueue.length === 0) {
			//worker.terminate();
		} else {
			algorithm = algorithmsQueue.pop();
			worker.postMessage({ items, algorithm, workerName, searchValue});
		}
	}
};

