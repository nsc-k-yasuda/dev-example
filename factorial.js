function factor(number){
    if(number==0 || number==1){
        return 1;
    }
let result=1;

for(let counter=number; counter>0;counter--){
    result=result*counter;
}
return result;
}

console.log(factor(5));