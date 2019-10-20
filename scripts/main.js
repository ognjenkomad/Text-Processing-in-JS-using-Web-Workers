const resultTable = $('#result-table');
const tableFooter = resultTable.find('tfoot');

const submitButton = $('#submit-button');
submitButton.prop('disabled', true);
const searchInput = $('#search-input');

const numbersRange = $('#numbers-range');
const numbersRangeText = $('#numbers-range-text');
const processingSelect = $('#processing-select');
const sortAlgorithmsMultiselect = $('#search-algorithms-multiselect');
const workerSelectContainer = $('#worker-select-container');
const workerSelect = $('#worker-select');

let unsortedArray = [];
let sortAlgorithms = [];

let finishedAlgorithmsCount = 0;
let numberOfAlgorithms = 0;
let totalTimeStart = 0;
let algorithmsQueue = [];

numbersRange.on('change', () => {
	numbersRangeText.text(numbersRange.val());
});

sortAlgorithmsMultiselect.on('change', () => {
	const selectedAlgorithms = sortAlgorithmsMultiselect.val();
	submitButton.prop('disabled', selectedAlgorithms.length === 0);
});

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
});

function findNumber() {
	const unsortedArrayLength = parseInt(numbersRange.val());
	if (unsortedArrayLength === 0) {
		alert('Choose valid array length...');
		return false;
	}
	unsortedArray = Array.from({length: unsortedArrayLength}, () => Math.floor(Math.random() * unsortedArrayLength));
	sortAlgorithms = sortAlgorithmsMultiselect.val();
	numberOfAlgorithms = sortAlgorithms.length;
	if (numberOfAlgorithms === 0) {
		alert('Choose at least one sort algorithm...');
		return false;
	}
	submitButton.prop('disabled', true);
	submitButton.text('Processing...');
	totalTimeStart = Date.now();
	algorithmsQueue = [...sortAlgorithms];
	finishedAlgorithmsCount = 0
	resultTable.find('tbody').empty()
	tableFooter.empty()
	if (processingSelect.val() == 2) {
		numberOfWorkers = workerSelect.val()
		for (let i = 1; i <= numberOfWorkers; i++) {
			const worker = new Worker(`../workers/worker.js?name=Worker${i}`);
			runWorker(worker, `worker_${i}`, [...unsortedArray]);
		}
	} else {
		runAlgorithmsSequential(sortAlgorithms);
		appendTableFooter()
		submitButton.prop('disabled', false);
		submitButton.text('Run');
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

const runAlgorithmsSequential = algorithms => {
	console.log('algorithms', algorithms);
	algorithms.forEach(algorithm => {
		const startTime = Date.now()
		window[`${algorithm}Sort`]([...unsortedArray]);
		const duration = Date.now() - startTime
		appentTableRow('-', algorithm, duration)
	});
}

const runWorker = (worker, workerName, array) => {
	let algorithm = algorithmsQueue.pop();
	if (!algorithm) {
		return false;
	}
	worker.postMessage({ algorithm, workerName, array });
	worker.onmessage = event => {		
		finishedAlgorithmsCount ++;
		
		appentTableRow(event.data.workerName, event.data.algorithm, event.data.duration)
		if (finishedAlgorithmsCount === numberOfAlgorithms) {
			appendTableFooter();
			submitButton.prop('disabled', false);
			submitButton.text('Run');
		}
		if (algorithmsQueue.length === 0) {
			// worker.terminate();
		} else {
			algorithm = algorithmsQueue.pop();
			worker.postMessage({ algorithm, workerName, array });
		}
	}
};

