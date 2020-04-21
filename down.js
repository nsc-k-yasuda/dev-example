let number =[1,5,3,11,7,16];

number.sort(
  function(a,b) {
    if (a < b){
       return 1;
    }else if (a > b){ 
       return -1;
    }else{
       return 0;
    }
  }
);

// [1975, 20, 11]
console.log(number);
