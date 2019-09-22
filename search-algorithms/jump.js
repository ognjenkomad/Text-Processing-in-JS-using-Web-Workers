function jumpSearch(arrayToSearch, valueToSearch) {
	let length = arrayToSearch.length;
	let step = Math.floor(Math.sqrt(length));
	let lowerBound = 0;
	while (arrayToSearch[Math.min(step, length) - 1] < valueToSearch) {
		lowerBound = step;
		step += step;
		if (lowerBound >= length) {
			return -1;
		}
	}

	let upperBound = Math.min(step, length);
	while (arrayToSearch[lowerBound] < valueToSearch) {
		lowerBound++;
		if (lowerBound === upperBound) {
			return -1;
		}
	}
	if (arrayToSearch[lowerBound] === valueToSearch) {
		return lowerBound;
	}
	return -1;
}
