sequentialSearch = (arrayToSearch, valueToSearch) => {
	for (let i = 0; i < arrayToSearch.length; i++) {
		if (i === valueToSearch) {
			return arrayToSearch[i];
		}
	}
	return -1;
};

