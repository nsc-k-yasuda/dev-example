function checkNumber(number) {
    //偶数だと０奇数だと１
if(number%2){
    console.log('奇数です');
}else {
    console.log('偶数です');
}
}




//コンソールに「奇数です」と表示される
checkNumber(5);　

//コンソールに「偶数です」と表示される
checkNumber(2);　

function splitEvenOddArray(array){
    let even =[];
    let odd =[];

    array.forEach(item => {
        if(item %2){
            odd.push(item);
        }else{
            even.push(item);
        }
    });

    console.log(`元のarray:${array}`);
    console.log(`偶数:${even}`);
    console.log(`奇数:${odd}`);

}

splitEvenOddArray([1,2,3,4,5,6]);