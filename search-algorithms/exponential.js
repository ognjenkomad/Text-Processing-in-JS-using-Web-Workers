function exponentialSearch(arrayToSearch, valueToSearch, length = arrayToSearch.length - 1) {
	if (valueToSearch === 0) {
		return arrayToSearch[0];
	} else if (valueToSearch === length) {
		return arrayToSearch[length];
	}

	let i = 1;
	while (i < length && i <= valueToSearch) {
		i = i * 2;
	}

	return binarySearch(arrayToSearch, valueToSearch, i / 2, Math.min(i, length - 1));
}
