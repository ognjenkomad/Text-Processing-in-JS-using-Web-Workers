const resultTable = $('#result-table')
const tableFooter = resultTable.find('tfoot')

const submitButton = $('#submit-button')
const searchInput = $('#search-input')

const processingSelect = $('#processing-select')
const workerSelectContainer = $('#worker-select-container')
const workerSelect = $('#worker-select')


array = Array.from({length: 100000}, () => Math.floor(Math.random() * 100000));

const sortAlgorithms = [
	'merge',
	'bubble',
	'insertion',
	'quick',
	'selection'
];

let finishedAlgorithmsCount = 0;
const numberOfAlgorithms = 5
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
	algorithmsQueue = [...sortAlgorithms];
	finishedAlgorithmsCount = 0
	resultTable.find('tbody').empty()
	tableFooter.empty()
	if (processingSelect.val() == 2) {
		numberOfWorkers = workerSelect.val()
		for (let i = 1; i <= numberOfWorkers; i++) {
			const worker = new Worker(`../workers/worker.js?name=Worker${i}`);
			runWorker(worker, `worker_${i}`, [...array]);
		}
	} else {
		runAllAlgorithmsSequenital()
		appendTableFooter()
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

const appentTableRow = (workerName, algorithm, duration) => {
	resultTable.find('tbody').append(
		`
		<tr>
			<td>${workerName.toUpperCase()}</td>
			<td>${algorithm.toUpperCase()}</td>
			<td>${duration} ms</td>
		</tr>
		`
	)
}

const runAllAlgorithmsSequenital = () => {
	sortAlgorithms.forEach(algorithm => {
		const startTime = Date.now()
		window[`${algorithm}Sort`]([...array]);
		const duration = Date.now() - startTime
		appentTableRow('-', algorithm, duration)
	});
}

const runWorker = (worker, workerName, array) => {
	let algorithm = algorithmsQueue.pop();
	worker.postMessage({ algorithm, workerName, array });
	worker.onmessage = event => {		
		finishedAlgorithmsCount ++;
		
		appentTableRow(event.data.workerName, event.data.algorithm, event.data.duration)
		if (finishedAlgorithmsCount === numberOfAlgorithms) {
			appendTableFooter()
		}
		if (algorithmsQueue.length === 0) {
			// worker.terminate();
		} else {
			algorithm = algorithmsQueue.pop();
			worker.postMessage({ algorithm, workerName, array });
		}
	}
};

