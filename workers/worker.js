self.onmessage = event => {
	const workerName = event.data.workerName;
	const array = event.data.array;
  const algorithm = event.data.algorithm;

	const startTime = Date.now();

	switch (algorithm) {
		case 'bubble':
			bubbleSort(array);
			break;
		case 'insertion':
			insertionSort(array);
			break;
		case 'merge':
			mergeSort(array);
			break;
		case 'quick':
			quickSort(array);
			break;
		case 'selection':
			selectionSort(array);
			break;
	}

	const duration = (Date.now() - startTime);

	self.postMessage({
		algorithm,
		workerName,
		duration
	});
};


// Algorithms
function bubbleSort(arr){
	var len = arr.length;
	for (var i = len-1; i>=0; i--){
		for(var j = 1; j<=i; j++){
			if(arr[j-1]>arr[j]){
					var temp = arr[j-1];
					arr[j-1] = arr[j];
					arr[j] = temp;
			 }
		}
	}
	return arr;
}

function insertionSort(arr){
  var i, len = arr.length, el, j;

  for(i = 1; i<len; i++){
    el = arr[i];
    j = i;

    while(j>0 && arr[j-1]>el){
      arr[j] = arr[j-1];
      j--;
   }

   arr[j] = el;
  }

  return arr;
}


function mergeSort(arr){

  var len = arr.length;
  if(len <2)
     return arr;
  var mid = Math.floor(len/2),
      left = arr.slice(0,mid),
      right =arr.slice(mid);
  //send left and right to the mergeSort to broke it down into pieces
  //then merge those
  return merge(mergeSort(left),mergeSort(right));
}

function merge(left, right){
  var result = [],
      lLen = left.length,
      rLen = right.length,
      l = 0,
      r = 0;
  while(l < lLen && r < rLen){
     if(left[l] < right[r]){
       result.push(left[l++]);
     }
     else{
       result.push(right[r++]);
    }
  }  
  //remaining part needs to be addred to the result
  return result.concat(left.slice(l)).concat(right.slice(r));
}

function quickSort(arr, left = 0, right = arr.length - 1){

  var len = arr.length, 
  pivot,
  partitionIndex;


 if(left < right){
   pivot = right;
   partitionIndex = partition(arr, pivot, left, right);
   
  //sort left and right
  quickSort(arr, left, partitionIndex - 1);
  quickSort(arr, partitionIndex + 1, right);
 }
 return arr;
}

function partition(arr, pivot, left, right){
  var pivotValue = arr[pivot],
      partitionIndex = left;

  for(var i = left; i < right; i++){
   if(arr[i] < pivotValue){
     swap(arr, i, partitionIndex);
     partitionIndex++;
   }
 }
 swap(arr, right, partitionIndex);
 return partitionIndex;
}
       

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


function selectionSort(arr){
  var minIdx, temp, 
      len = arr.length;
  for(var i = 0; i < len; i++){
    minIdx = i;
    for(var  j = i+1; j<len; j++){
       if(arr[j]<arr[minIdx]){
          minIdx = j;
       }
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  return arr;
}
