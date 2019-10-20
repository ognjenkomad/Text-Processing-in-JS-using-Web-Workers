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
		if (arr[i] < pivotValue) {
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
