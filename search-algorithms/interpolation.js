function interpolationSearch(arrayToSearch, valueToSearch){
  let low = 0
  let high = arrayToSearch.length - 1
  console.log(">>>>>>>>>>>>>>>> IN !");
  
  if(low <= high 
        && valueToSearch >= arrayToSearch[low]
        && valueToSearch <= arrayToSearch[high]){
          console.log(">>>>>>>>>>>>>>>> IN 2");
    var delta = (valueToSearch-arrayToSearch[low])/(arrayToSearch[high]-arrayToSearch[low]);
    var position = low + Math.floor((high-low)*delta);
    if (arrayToSearch[position] == valueToSearch){
      return position;
    }
    if (arrayToSearch[position] < valueToSearch){
      low = position + 1;
    } else {
      high = position - 1;
    }
    return interpolationSearch(arrayToSearch, valueToSearch, low, high)
  }
 
  return -1;
}