function countDown(number){
    let a =[];
    if(number>0){
        for(let b=0;b<=number;b++){
            if(a[b-2]+a[b-1]>number){
                break;
            }
            if(b==0){
                a.push(1);
            }else if(b==1){
                a.push(0+a[b-1]);
            }else{
                a.push(a[b-2]+a[b-1]);
            }
        }
    }
    return a;
}
console.log(countDown(10));