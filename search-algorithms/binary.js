function binarySearch(arrayToSearch, valueToSearch, start = 0, end = arrayToSearch.length-1){
  if(start <= end){
    var middle = Math.ceil((end + start)/2)
    var middleValue = arrayToSearch[middle];
    if(middleValue === valueToSearch){
      return arrayToSearch.indexOf(valueToSearch);
    } else if(valueToSearch < middleValue){
        end = middle - 1;
    } else{
        start = middle + 1;
    }
    return binarySearch(arrayToSearch, valueToSearch, start, end);
  }
  return -1;
}