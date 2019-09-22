// TODO IMPORT BINARY SEARCH
function binary(arrayToSearch, valueToSearch){
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
    return binary(arrayToSearch, valueToSearch, start, end);
  }
  return -1;
}

function exponentialSearch(arrayToSearch, valueToSearch){
  let length = arrayToSearch.length
  if (arrayToSearch[0] == valueToSearch){
      return 0;
  }

  var i = 1;
  while (i < length && arrayToSearch[i] <= valueToSearch){
      i = i*2;
  }

  return binary(arrayToSearch, valueToSearch, i/2, Math.min(i, length-1));
}