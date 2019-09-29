function interpolationSearch(arrayToSearch, valueToSearch, low = 0, high = arrayToSearch.length - 1) {
	if (low <= high
		&& valueToSearch >= low
		&& valueToSearch <= high
	) {
		let delta = (valueToSearch - low) / (high - low);
		let position = low + Math.floor((high - low) * delta);
		if (position === valueToSearch) {
			return arrayToSearch[position];
		}
		if (position < valueToSearch) {
			low = position + 1;
		} else {
			high = position - 1;
		}
		return interpolationSearch(arrayToSearch, valueToSearch, low, high)
	}

	return -1;
}
