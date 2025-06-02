var findPeakElement = function(arr) {
    if(arr.length<=2){
        return 0
    }
    for(let i=1;i<arr.length;i++){
        if(arr[i]>arr[i-1] && arr[i]>arr[i+1]){
            return i
        }
    }
    return 0
};

var findPeakElement = function(arr) {
    if(arr.length<=2){
        return 0
    }
    for(let i=1;i<arr.length-1;i++){
        if(arr[i]>arr[i-1] && arr[i]>arr[i+1]){
            return i
        }
    }
    return 0
};



