/*
첫째 줄에 톱니바퀴의 개수 T (1 ≤ T ≤ 1,000)가 주어진다. 

둘째 줄부터 T개의 줄에 톱니바퀴의 상태가 가장 왼쪽 톱니바퀴부터 순서대로 주어진다. 
상태는 8개의 정수로 이루어져 있고, 12시방향부터 시계방향 순서대로 주어진다. N극은 0, S극은 1로 나타나있다.

다음 줄에는 회전 횟수 K(1 ≤ K ≤ 1,000)가 주어진다. 
다음 K개 줄에는 회전시킨 방법이 순서대로 주어진다. 
각 방법은 두 개의 정수로 이루어져 있고, 첫 번째 정수는 회전시킨 톱니바퀴의 번호, 두 번째 정수는 방향이다. 
방향이 1인 경우는 시계 방향이고, -1인 경우는 반시계 방향이다.

출력

총 K번 회전시킨 이후에 12시방향이 S극인 톱니바퀴의 개수를 출력한다.

출처 https://www.acmicpc.net/problem/15662
*/
let sampleData = `4
10101111
01111101
11001110
00000010
2
3 -1
1 1`;
let sampleData2 = `4
11111111
11111111
11111111
11111111
3
1 1
2 1
3 1`;
let sampleData3 = `4
10010011
01010011
11100011
01010101
8
1 1
2 1
3 1
4 1
1 -1
2 -1
3 -1
4 -1`;
let sampleData4 = `5
10010011
01010011
11100011
01010101
01010011
10
1 1
2 1
3 1
4 1
1 -1
2 -1
3 -1
4 -1
5 1
5 -1`;

function solution(text) {
  //text data parse
  let dataArray = Array();
  dataArray = text.split("\n");

  let T = parseInt(dataArray[0]);
  let gearArray = dataArray.filter((v, i) => {
    if (i >= 1 && i <= T) return v;
  });
  let K = parseInt(dataArray[T + 1]);
  let spinArray = dataArray.filter((v, i) => {
    if (i > dataArray.length - K - 1) return v;
  });

  //running
  spinArray.forEach((v) => {
    //data
    let cGearArray = gearArray;
    let spinArray = v.split(" ");
    let mainGearIndex = parseInt(spinArray[0]) - 1;
    let spin = parseInt(spinArray[1]);

    //first Move
    cGearArray[mainGearIndex] = gearMove(gearArray[mainGearIndex], spin);

    //left Move
    let now = mainGearIndex;
    let nowSpin = spin;
    while (true) {
      if (now > 0 && gearHandler(gearArray[now], gearArray[now - 1], "left")) {
        cGearArray[now - 1] = gearMove(
          gearArray[now - 1],
          nowSpin == 1 ? -1 : 1
        );
        now--;
        nowSpin = nowSpin === 1 ? -1 : 1;
      } else {
        break;
      }
    }
    //right Move
    now = mainGearIndex;
    nowSpin = spin;
    while (true) {
      if (
        now < gearArray.length - 1 &&
        gearHandler(gearArray[now], gearArray[now + 1], "right")
      ) {
        cGearArray[now + 1] = gearMove(
          gearArray[now + 1],
          nowSpin === 1 ? -1 : 1
        );
        now++;
        nowSpin = nowSpin === 1 ? -1 : 1;
      } else {
        break;
      }
    }
    //change gear
    gearArray = cGearArray;
  });

  //result
  let result = gearArray.filter((v) => {
    return v.charAt(0) === "1" ? v : "";
  });

  return result.length;

  //동작 함수.
  function gearMove(gear, direction) {
    if (direction === 1) {
      return `${gear.charAt(7)}${gear.substring(0, gear.length - 1)}`;
    } else {
      return `${gear.substring(1, gear.length)}${gear.charAt(0)}`;
    }
  }
  //동작여부 감지 함수.
  function gearHandler(gear, nextGear, direction) {
    if (direction === "right") {
      if (gear.charAt(2) !== nextGear.charAt(6)) {
        return true;
      }
    } else {
      if (gear.charAt(6) !== nextGear.charAt(2)) {
        return true;
      }
    }
    return false;
  }
}

solution(sampleData4);
