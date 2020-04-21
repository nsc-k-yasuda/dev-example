function sosu(num) {

    let prime_num1 = [],
        prime_num2 = [];
    for (let i = 0; i <= num; i++) {
      prime_num2.push(true);
    }
    for (let i = 2; i <= num; i++) {
      if (prime_num2[i]) {
        prime_num1.push(i);
        for (let j = 1; i * j <= num; j++) {
          prime_num2[i * j] = false;
        }
      }
    }
  
    console.log(prime_num1);
  }
  
  sosu(1)
  sosu(2)
  sosu(8)
  sosu(20)

