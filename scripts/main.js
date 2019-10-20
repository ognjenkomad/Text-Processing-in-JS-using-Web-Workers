//Declarations
const arrayLengthRangeInput = $('#array-length-range-input');
const arrayLengthText = $('#array-length-text');
const processingTypeSelect = $('#processing-type-select');
const algorithmsSelect = $('#algorithms-multi-select');
const workerSelectContainer = $('#worker-select-container');
const workerSelect = $('#worker-select');
const submitButton = $('#btn-submit');
const resultTable = $('#result-table');
const resultTableFooter = resultTable.find('tfoot');

let randomGeneratedArray = [];
let sortAlgorithms = [];
let algorithmsQueue = [];
let finishedAlgorithmsCount = 0;
let selectedAlgorithmsCount = 0;
let processingStartTime = 0;

// Functions
const validateInputData = () => {
	const selectedArrayLength = parseInt(arrayLengthRangeInput.val());
	const selectedAlgorithms = algorithmsSelect.val();
	const disableSubmitButton = selectedArrayLength === 0 || selectedAlgorithms.length === 0;
	submitButton.prop('disabled', disableSubmitButton);
};

const setSubmitButtonDefaultState = () => {
	submitButton.prop('disabled', false);
	submitButton.text('Run');
};

const setSubmitBtnProcessingState = () => {
	submitButton.prop('disabled', true);
	submitButton.text('Processing...');
};

const process = () => {
	setSubmitBtnProcessingState();
	const randomGeneratedArrayLength = parseInt(arrayLengthRangeInput.val());
	randomGeneratedArray = Array.from({length: randomGeneratedArrayLength}, () => Math.floor(Math.random() * randomGeneratedArrayLength));
	sortAlgorithms = algorithmsSelect.val();
	selectedAlgorithmsCount = sortAlgorithms.length;
	algorithmsQueue = [...sortAlgorithms];
	finishedAlgorithmsCount = 0;
	resultTable.find('tbody').empty();
	resultTableFooter.empty();
	processingStartTime = Date.now();
	if (parseInt(processingTypeSelect.val()) === 2) {
		runAlgorithmsUsingWorkers();
	} else {
		runAlgorithmsSequential();
		appendTableFooter();
		setSubmitButtonDefaultState();
	}
};

const runAlgorithmsUsingWorkers = () => {
	for (let i = 1; i <= workerSelect.val(); i++) {
		const worker = new Worker(`../workers/worker.js?name=Worker${i}`);
		runWorker(worker, `worker_${i}`, [...randomGeneratedArray]);
	}
};

const appendTableFooter = () => {
	const duration = Date.now() - processingStartTime;
	resultTableFooter.empty();
	resultTableFooter.append(`
		<tr class="table-primary">
			<td colspan="8" class="text-right"><b>Total Time:</b> ${duration} ms</td>
		</tr>
	`)
};

const appendTableRow = (workerName, algorithm, duration) => {
	resultTable.find('tbody').append(
		`
		<tr>
			<td>${workerName.toUpperCase()}</td>
			<td>${algorithm.toUpperCase()}</td>
			<td>${duration} ms</td>
		</tr>
		`
	)
};

const runAlgorithmsSequential = () => {
	sortAlgorithms.forEach(algorithm => {
		const startTime = Date.now();
		window[`${algorithm}Sort`]([...randomGeneratedArray]);
		const duration = Date.now() - startTime;
		appendTableRow('-', algorithm, duration);
	});
};

const runWorker = (worker, workerName, arrayToSort) => {
	let algorithm = algorithmsQueue.pop();
	if (!algorithm) {
		return false;
	}
	worker.postMessage({algorithm, workerName, arrayToSort});
	worker.onmessage = event => {
		finishedAlgorithmsCount++;
		appendTableRow(event.data.workerName, event.data.algorithm, event.data.duration);
		if (finishedAlgorithmsCount === selectedAlgorithmsCount) {
			appendTableFooter();
			setSubmitButtonDefaultState();
		}
		if (algorithmsQueue.length === 0) {
			// worker.terminate();
		} else {
			algorithm = algorithmsQueue.pop();
			worker.postMessage({algorithm, workerName, arrayToSort});
		}
	}
};

// Events
arrayLengthRangeInput.on('change', () => {
	validateInputData();
	arrayLengthText.text(arrayLengthRangeInput.val());
});

algorithmsSelect.on('change', validateInputData);

submitButton.on('click', process);

processingTypeSelect.on('change', () => {
	if (parseInt(processingTypeSelect.val()) === 2) {
		workerSelectContainer.show();
		return true;
	}
	workerSelectContainer.hide();
});

