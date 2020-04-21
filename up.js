let number = [1,2,3,5,10,6,7,17,9];

//調べる範囲の開始位置を１つずつ後ろへ移動するfor文
for(let i = 0; i < number.length; i++){
    //後ろから前に向かって小さい値を浮かび上がらせるfor文
    for(let j = number.length-1; j>i;j--){
        //隣りあう２つの値を比べて、後ろが小さければ交換する
        if(number[j]<number[j-1]){
            let tmp = number[j];
            number[j] = number[j-1];
            number[j-1] =tmp;
        }
    }
}
//ソート後の配列の表示
console.log(number);