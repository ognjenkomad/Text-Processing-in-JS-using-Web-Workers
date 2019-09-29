function jumpSearch(arrayToSearch, valueToSearch) {
	let length = arrayToSearch.length;
	let step = Math.floor(Math.sqrt(length));
	let lowerBound = 0;
	while (Math.min(step, length) - 1 < valueToSearch) {
		lowerBound = step;
		step += step;
		if (lowerBound >= length) {
			return -1;
		}
	}

	let upperBound = Math.min(step, length);
	while (lowerBound < valueToSearch) {
		lowerBound++;
		if (lowerBound === upperBound) {
			return -1;
		}
	}
	if (lowerBound === valueToSearch) {
		return arrayToSearch[lowerBound];
	}
	return -1;
}
