function solution(answers) {
  var answer = [];
  const method1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const method2 = [2, 1, 3, 2, 4, 2, 5, 2, 1, 2];
  const method3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let one = 0,
    two = 0,
    three = 0;
  answers = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 5, 5];
  answers.forEach((v, i) => {
    if (v === method1[i % 10]) one++;
    if (v === method2[i % 10]) two++;
    if (v === method3[i % 10]) three++;
  });
  if (Math.max(one, two, three) == one) answer.push(1);
  if (Math.max(one, two, three) == two) answer.push(2);
  if (Math.max(one, two, three) == three) answer.push(3);

  return answer;
}
