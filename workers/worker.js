self.onmessage = event => {
	const workerName = event.data.workerName;
	const algorithm = event.data.algorithm;

	const startTime = Date.now();

	const words = textToArray(event.data.text);

	let sortedWords = [];

	switch (algorithm) {
		case 'bubble':
			sortedWords = bubbleSort(words);
			break;
		case 'insertion':
			sortedWords = insertionSort(words);
			break;
		case 'merge':
			sortedWords = mergeSort(words);
			break;
		case 'quick':
			sortedWords = quickSort(words);
			break;
		case 'selection':
			sortedWords = selectionSort(words);
			break;
	}

	const duration = Date.now() - startTime;

	self.postMessage({
		algorithm,
		workerName,
		duration,
		sortedWords
	});
};

const textToArray = text => {
	text = text.replace(/[^A-Za-z\s]/g, "");
	text = text.replace(/(\r\n|\n|\r)/gm, " ");
	text = text.replace(/\s{2,}/g, " ");
	return text.split(' ');
};

// *** SORT ALGORITHMS ***

// *** BUBBLE SORT ***
function bubbleSort(arr) {
	let len = arr.length;
	for (let i = len - 1; i >= 0; i--) {
		for (let j = 1; j <= i; j++) {
			if (arr[j - 1].localeCompare(arr[j]) === 1) {
				let temp = arr[j - 1];
				arr[j - 1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

// *** INSERTION SORT ***
function insertionSort(arr) {
	let i, len = arr.length, el, j;

	for (i = 1; i < len; i++) {
		el = arr[i];
		j = i;

		while (j > 0 && arr[j - 1].localeCompare(el) === 1) {
			arr[j] = arr[j - 1];
			j--;
		}

		arr[j] = el;
	}

	return arr;
}

// *** MERGE SORT ***
function mergeSort(arr) {
	let len = arr.length;
	if (len < 2)
		return arr;
	let mid = Math.floor(len / 2),
		left = arr.slice(0, mid),
		right = arr.slice(mid);
	//send left and right to the mergeSort to broke it down into pieces
	//then merge those
	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	let result = [],
		lLen = left.length,
		rLen = right.length,
		l = 0,
		r = 0;
	while (l < lLen && r < rLen) {
		if (left[l].localeCompare(right[r]) === -1) {
			result.push(left[l++]);
		} else {
			result.push(right[r++]);
		}
	}
	//remaining part needs to be addred to the result
	return result.concat(left.slice(l)).concat(right.slice(r));
}

// *** QUICK SORT ***
function quickSort(arr, left = 0, right = arr.length - 1) {
	let len = arr.length,
		pivot,
		partitionIndex;

	if (left < right) {
		pivot = right;
		partitionIndex = partition(arr, pivot, left, right);

		//sort left and right
		quickSort(arr, left, partitionIndex - 1);
		quickSort(arr, partitionIndex + 1, right);
	}
	return arr;
}

function partition(arr, pivot, left, right) {
	let pivotValue = arr[pivot],
		partitionIndex = left;

	for (let i = left; i < right; i++) {
		if (arr[i].localeCompare(pivotValue) === -1) {
			swap(arr, i, partitionIndex);
			partitionIndex++;
		}
	}
	swap(arr, right, partitionIndex);
	return partitionIndex;
}

function swap(arr, i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

// *** SELECTION SORT ***
function selectionSort(arr) {
	let minIdx, temp,
		len = arr.length;
	for (let i = 0; i < len; i++) {
		minIdx = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j].localeCompare(arr[minIdx]) === -1) {
				minIdx = j;
			}
		}
		temp = arr[i];
		arr[i] = arr[minIdx];
		arr[minIdx] = temp;
	}
	return arr;
}

// *** END SORT ALGORITHMS ***
