function interpolationSearch(arrayToSearch, valueToSearch, low = 0, high = arrayToSearch.length - 1) {
	if (low <= high
		&& valueToSearch >= arrayToSearch[low]
		&& valueToSearch <= arrayToSearch[high]
	) {
		let delta = (valueToSearch - arrayToSearch[low]) / (arrayToSearch[high] - arrayToSearch[low]);
		let position = low + Math.floor((high - low) * delta);
		if (arrayToSearch[position] === valueToSearch) {
			return arrayToSearch.indexOf(valueToSearch);
		}
		if (arrayToSearch[position] < valueToSearch) {
			low = position + 1;
		} else {
			high = position - 1;
		}
		return interpolationSearch(arrayToSearch, valueToSearch, low, high)
	}

	return -1;
}
