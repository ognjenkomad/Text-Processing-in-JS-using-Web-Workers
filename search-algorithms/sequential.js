sequentialSearch = (arrayToSearch, valueToSearch) =>  {
  for (var i=0; i<arrayToSearch.length; i++) {
    if (arrayToSearch[i] == valueToSearch) {
      return i;
    }
  } return null;
}

