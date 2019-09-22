function binarySearch(arrayToSearch, valueToSearch){
	let start = 0;
	let end = arrayToSearch.length - 1;
  if(start <= end){
    var middle = Math.ceil((end + start)/2)
    var middleValue = arrayToSearch[middle];
    if(middleValue === valueToSearch){
      return middle;
    } else if(valueToSearch < middleValue){
        end = middle - 1;
    } else{
        start = middle + 1;
    }
    return binarySearch(arrayToSearch, valueToSearch, start, end);
  }
  return -1;
}