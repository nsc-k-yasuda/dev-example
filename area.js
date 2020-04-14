/*
 * 四角の面積を計算してください。
 *
 * length: 縦の長さ
 * width: 横の長さ
 */
function getArea(length, width) {
    let area=0;

    if(length >=1&&length<=1000){
        if(width>=1&&width<=1000){
            area=length*width;
        }
    }
    
    return area;
}

/**
 * 四角の周囲を計算してください。
 *
 *
 * length: 縦の長さ
 * width: 横の長さ
 */
function getPerimeter(length, width) {
    let perimeter=0;
    
    if(length >=1&&length<=1000){
        if(width>=1&&width<=1000){
            
    perimeter=(length+width)*2;
        }}
    return perimeter
}

function validateNumber(number) {
    if(number >= 1 && number <= 1000) {
        return number;
    } else {
        return 0;
    }
}

console.log(getArea(3,5));

console.log(getArea(5000, 5000));

console.log(getPerimeter(3,5));

console.log(getPerimeter(5000, 5000));