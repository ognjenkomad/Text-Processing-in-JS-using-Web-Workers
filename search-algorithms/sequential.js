sequentialSearch = (arrayToSearch, valueToSearch) => {
	for (let i = 0; i < arrayToSearch.length; i++) {
		if (arrayToSearch[i] === valueToSearch) {
			return i;
		}
	}
	return -1;
};

