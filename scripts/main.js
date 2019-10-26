//Declarations
const textArea = $('#text-for-processing');
const processingTypeInput = $('#processing-type-input');
const algorithmsInput = $('#algorithms-multi-select');
const workerSelectContainer = $('#worker-select-container');
const workerSelect = $('#worker-select');
const resultTable = $('#result-table');
const wordsTable = $('#words-table');
const resultTableFooter = resultTable.find('tfoot');
const form = $('#text-processing-form');
const submitButton = $('#btn-submit');

let textForProcessing = '';
let selectedAlgorithms = [];
let algorithmsQueue = [];
let finishedAlgorithmsCount = 0;
let selectedAlgorithmsCount = 0;
let processingStartTime = 0;
let sortedWords = [];

const onFormSubmit = () => {
	disableSubmitButton();
	wordsTable.find('tbody').empty();
	resultTable.find('tbody').empty();
	resultTableFooter.empty();
	selectedAlgorithms = algorithmsInput.val();
	selectedAlgorithmsCount = selectedAlgorithms.length;
	algorithmsQueue = [...selectedAlgorithms];
	finishedAlgorithmsCount = 0;
	textForProcessing = textArea.val();
	processingStartTime = Date.now();
	processingTypeInput.val() === '2' ? runAlgorithmsUsingWorkers() : runAlgorithmsSequential();
};

const disableSubmitButton = () => {
	submitButton.text('Processing...');
	submitButton.prop('disabled', true);
};

const enableSubmitButton = () => {
	submitButton.text('Run');
	submitButton.prop('disabled', false);
};

const textToArray = text => {
	text = text.replace(/[^A-Za-z\s]/g, "");
	text = text.replace(/(\r\n|\n|\r)/gm, " ");
	text = text.replace(/\s{2,}/g, " ");
	return text.split(' ');
};

const arrayUnique = array => {
	return array.filter(function (item, index) {
		return array.indexOf(item) >= index;
	});
};

const countWords = text => {
	let words = textToArray(text);
	let counts = {};
	words.forEach(function (x) {
		counts[x] = (counts[x] || 0) + 1;
	});
	return counts;
};

const appendWordsTableRow = sortedWords => {
	let uniqueWords = arrayUnique(sortedWords);
	let counts = countWords(textForProcessing);
	uniqueWords.forEach(value => {
		wordsTable.find('tbody').append(
			`
		<tr>
			<td class="text-center">${value}</td>
			<td class="text-center" style="min-width: 100px;">${counts[value]}</td>
		</tr>
		`
		);
	});
};

const appendResultTableRow = (workerName, algorithm, duration) => {
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

const appendResultTableFooter = () => {
	const duration = Date.now() - processingStartTime;
	resultTableFooter.empty();
	resultTableFooter.append(`
		<tr class="table-primary">
			<td colspan="8" class="text-right"><b>Total Time:</b> ${duration} ms</td>
		</tr>
	`)
};

const runAlgorithmsSequential = () => {
	selectedAlgorithms.forEach(algorithm => {
		const startTime = Date.now();
		let words = textToArray(textForProcessing);
		sortedWords = window[`${algorithm}Sort`](words);
		const duration = Date.now() - startTime;
		appendResultTableRow('-', algorithm, duration);
	});
	appendResultTableFooter();
	appendWordsTableRow(sortedWords);
	enableSubmitButton();
};

const runAlgorithmsUsingWorkers = () => {
	for (let i = 1; i <= workerSelect.val(); i++) {
		const worker = new Worker(`../workers/worker.js?name=Worker${i}`);
		runWorker(worker, `worker_${i}`, textForProcessing);
	}
};

const runWorker = (worker, workerName, text) => {
	let algorithm = algorithmsQueue.pop();
	if (!algorithm) {
		return false;
	}
	worker.postMessage({algorithm, workerName, text});
	worker.onmessage = event => {
		finishedAlgorithmsCount++;
		appendResultTableRow(event.data.workerName, event.data.algorithm, event.data.duration);
		if (finishedAlgorithmsCount === selectedAlgorithmsCount) {
			appendResultTableFooter();
			appendWordsTableRow(event.data.sortedWords);
			enableSubmitButton();
		}
		if (algorithmsQueue.length === 0) {
			// worker.terminate();
		} else {
			algorithm = algorithmsQueue.pop();
			worker.postMessage({algorithm, workerName, text});
		}
	}
};

processingTypeInput.on('change', event => {
	event.target.value === '2' ? workerSelectContainer.show() : workerSelectContainer.hide();
});

form.on('submit', onFormSubmit);

