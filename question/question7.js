/*
문제 설명
한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

제한사항
numbers는 길이 1 이상 7 이하인 문자열입니다.
numbers는 0~9까지 숫자만으로 이루어져 있습니다.
"013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.
입출력 예
numbers	return
"17"	3
"011"	2
입출력 예 설명
예제 #1
[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

예제 #2
[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

11과 011은 같은 숫자로 취급합니다.


출처 : https://programmers.co.kr/learn/courses/30/lessons/42839
*/

function solution(numbers) {
  var answer = 0;
  const numberArray = numbers.split("").map((v) => parseInt(v));
  let result = [];

  function combine(array, num) {
    let res = [];
    if (num === 1) return array.map((v) => [v]);
    array.forEach((fixed, index, origin) => {
      const slice = [...origin.slice(0, index), ...origin.slice(index + 1)];
      const fixItem = combine(slice, num - 1).map((items) => [fixed, ...items]);
      res.push(...fixItem);
    });
    return res;
  }
  function isPrime(num) {
    if (num <= 1) {
      return false;
    }
    if (num % 2 === 0) {
      return num === 2 ? true : false;
    }
    const sqrt = parseInt(Math.sqrt(num));
    for (let divider = 3; divider <= sqrt; divider += 2) {
      if (num % divider === 0) {
        return false;
      }
    }
    return true;
  }
  numberArray.forEach((v, i) => {
    result = result.concat(
      combine(numberArray, i + 1).map((v) => Number(v.join("")))
    );
  });
  answer = result.filter(
    (item, index) => result.indexOf(item) === index && isPrime(item)
  ).length;
  return answer;
}
solution("123450");
