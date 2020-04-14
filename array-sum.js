let numbers = [1,2,3,4,5];

function arraySumWithFor(array) {
    let sum = 0;

    //For を使ってarray の合計を計算してください。
    for (let index=0; index <array.length; index++){
        sum=sum+array[index];
    }
    return sum
}

function arraySumWithWhile(array) {
    let sum = 0;

    //While を使ってarray の合計を計算してください。
    let index=0;
    while(index<array.length ){
    sum=sum + array[index];
    index++;
}

    return sum;
}

function arraySumWithDoWhile(array) {
    let sum = 0;

    //Do While を使ってarray の合計を計算してください。
    let index=0;
do{ 
    sum=sum + array[index];
    index++;

} while(index<array.length );
    return sum
}

function arraySumWithForEach(array) {
    let sum = 0;

    //ForEach を使ってarray の合計を計算してください。
    array.forEach(element => {
    sum=sum+element;});
    
    return sum
}

let forSum = arraySumWithFor(numbers);
let whileSum = arraySumWithWhile(numbers);
let doWhileSum = arraySumWithDoWhile(numbers);
let forEachSum = arraySumWithForEach(numbers);

console.log(`For文での合計: ${forSum}`);
console.log(`While文での合計: ${whileSum}`);
console.log(`doWhile文での合計: ${doWhileSum}`);
console.log(`ForEach文での合計: ${forEachSum}`);