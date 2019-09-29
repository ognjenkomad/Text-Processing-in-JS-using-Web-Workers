function binarySearch(arrayToSearch, valueToSearch, start = 0, end = arrayToSearch.length - 1) {
	if (start <= end) {
		let middle = Math.ceil((end + start) / 2);
		if (middle === valueToSearch) {
			return arrayToSearch[middle];
		} else if (valueToSearch < middle) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
		return binarySearch(arrayToSearch, valueToSearch, start, end);
	}
	return -1;
}
