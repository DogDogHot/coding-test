/*
두 큐 합 같게 만들기
문제 설명
길이가 같은 두 개의 큐가 주어집니다. 하나의 큐를 골라 원소를 추출(pop)하고, 추출된 원소를 다른 큐에 집어넣는(insert) 작업을 통해 각 큐의 원소 합이 같도록 만들려고 합니다. 이때 필요한 작업의 최소 횟수를 구하고자 합니다. 한 번의 pop과 한 번의 insert를 합쳐서 작업을 1회 수행한 것으로 간주합니다.

큐는 먼저 집어넣은 원소가 먼저 나오는 구조입니다. 이 문제에서는 큐를 배열로 표현하며, 원소가 배열 앞쪽에 있을수록 먼저 집어넣은 원소임을 의미합니다. 즉, pop을 하면 배열의 첫 번째 원소가 추출되며, insert를 하면 배열의 끝에 원소가 추가됩니다. 예를 들어 큐 [1, 2, 3, 4]가 주어졌을 때, pop을 하면 맨 앞에 있는 원소 1이 추출되어 [2, 3, 4]가 되며, 이어서 5를 insert하면 [2, 3, 4, 5]가 됩니다.

다음은 두 큐를 나타내는 예시입니다.

queue1 = [3, 2, 7, 2]
queue2 = [4, 6, 5, 1]
두 큐에 담긴 모든 원소의 합은 30입니다. 따라서, 각 큐의 합을 15로 만들어야 합니다. 예를 들어, 다음과 같이 2가지 방법이 있습니다.

queue2의 4, 6, 5를 순서대로 추출하여 queue1에 추가한 뒤, queue1의 3, 2, 7, 2를 순서대로 추출하여 queue2에 추가합니다. 그 결과 queue1은 [4, 6, 5], queue2는 [1, 3, 2, 7, 2]가 되며, 각 큐의 원소 합은 15로 같습니다. 이 방법은 작업을 7번 수행합니다.
queue1에서 3을 추출하여 queue2에 추가합니다. 그리고 queue2에서 4를 추출하여 queue1에 추가합니다. 그 결과 queue1은 [2, 7, 2, 4], queue2는 [6, 5, 1, 3]가 되며, 각 큐의 원소 합은 15로 같습니다. 이 방법은 작업을 2번만 수행하며, 이보다 적은 횟수로 목표를 달성할 수 없습니다.
따라서 각 큐의 원소 합을 같게 만들기 위해 필요한 작업의 최소 횟수는 2입니다.

길이가 같은 두 개의 큐를 나타내는 정수 배열 queue1, queue2가 매개변수로 주어집니다. 각 큐의 원소 합을 같게 만들기 위해 필요한 작업의 최소 횟수를 return 하도록 solution 함수를 완성해주세요. 단, 어떤 방법으로도 각 큐의 원소 합을 같게 만들 수 없는 경우, -1을 return 해주세요.

제한사항
1 ≤ queue1의 길이 = queue2의 길이 ≤ 300,000
1 ≤ queue1의 원소, queue2의 원소 ≤ 109
주의: 언어에 따라 합 계산 과정 중 산술 오버플로우 발생 가능성이 있으므로 long type 고려가 필요합니다.
입출력 예
queue1	queue2	result
[3, 2, 7, 2]	[4, 6, 5, 1]	2
[1, 2, 1, 2]	[1, 10, 1, 2]	7
[1, 1]	[1, 5]	-1
입출력 예 설명
입출력 예 #1

문제 예시와 같습니다.

입출력 예 #2

두 큐에 담긴 모든 원소의 합은 20입니다. 따라서, 각 큐의 합을 10으로 만들어야 합니다. queue2에서 1, 10을 순서대로 추출하여 queue1에 추가하고, queue1에서 1, 2, 1, 2와 1(queue2으로부터 받은 원소)을 순서대로 추출하여 queue2에 추가합니다. 그 결과 queue1은 [10], queue2는 [1, 2, 1, 2, 1, 2, 1]가 되며, 각 큐의 원소 합은 10으로 같습니다. 이때 작업 횟수는 7회이며, 이보다 적은 횟수로 목표를 달성하는 방법은 없습니다. 따라서 7를 return 합니다.

입출력 예 #3

어떤 방법을 쓰더라도 각 큐의 원소 합을 같게 만들 수 없습니다. 따라서 -1을 return 합니다.

*/

/*
solution 첫번재 . array shift push 를 이용한 방법.
timeout 으로 인한 철회
*/
function solution(queue1, queue2) {
    let sumQueue1 = queue1.reduce((pre,cur)=>pre+cur,0)
    let sumQueue2 = queue2.reduce((pre,cur)=>pre+cur,0)
    let nowStack = 0
    const mid = (sumQueue1+sumQueue2) / 2
    const maxStack = queue1.length + queue2.length+1

    //만약 처음부터 중간값이면 0번을 해도 같다.
    if(sumQueue1 === mid)return 0;
    if(!Number.isInteger(mid))return -1;

    let minResult = -1;
    
    let diff = sumQueue1 - sumQueue2
    const goalDiff = diff / 2
    //diff가 0보다 작으면 queue1 shift 크면 queue2 shift 
    while(goalDiff != diff){
        if(goalDiff < diff){
            const shiftData = queue1.shift()
            queue2.push(shiftData)
            diff -= shiftData
        }else{
            const shiftData = queue2.shift()
            queue1.push(shiftData)
            diff += shiftData
        }
        nowStack++;
        if(nowStack > maxStack)break;
    }  
    if(goalDiff === diff) minResult = nowStack;
    return minResult;
}



/*
solution 두번째 . array shift 가 많은 리소스를 잡아먹는것을 확인하여. 수정.
테스트 1번이 실패
*/
function solution2(queue1, queue2) {
    let sumQueue1 = queue1.reduce((pre,cur)=>pre+cur,0)
    let sumQueue2 = queue2.reduce((pre,cur)=>pre+cur,0)
    let nowStack = 0
    let nowQueue1Stack = 0
    let nowQueue2Stack = 0
    const mid = (sumQueue1+sumQueue2) / 2
    const maxStack = queue1.length + queue2.length+1

    //만약 처음부터 중간값이면 0번을 해도 같다.
    if(sumQueue1 === mid)return 0;
    if(!Number.isInteger(mid))return -1;

    let minResult = -1;
    
    let diff = sumQueue1 - sumQueue2
    const goalDiff = diff / 2
    let shiftQueue1Arr = []
    let shiftQueue2Arr = []
    //두 수의 차이가 절반이되면 서로가 같은수를 가지고있는것으로 판단. (모든 숫자 덧셈으로 인한 리소스 낭비 삭제)
    while(goalDiff != diff){
        if(goalDiff < diff){
            let shiftData = 0
            if(nowQueue1Stack >= queue1.length){
                shiftData = shiftQueue2Arr[queue1.length - nowQueue1Stack]
            }else{
                shiftData = queue1[nowQueue1Stack]
            }
            shiftQueue1Arr.push(shiftData)
            diff -= shiftData
            nowQueue1Stack++
        }else{
            let shiftData = 0
            if(nowQueue2Stack >= queue2.length){
                shiftData = shiftQueue1Arr[queue2.length - nowQueue2Stack]
            }else{
                shiftData = queue2[nowQueue2Stack]
            }
            shiftQueue2Arr.push(shiftData)
            diff += shiftData
            nowQueue2Stack++
        }
        nowStack++;
        if(nowStack > maxStack)break;
    }  
    if(goalDiff === diff) minResult = nowStack;
    return minResult;
}

/*
solution 세번째 . 기존 queue에 삽입하여 그대로 사용하는 방법 사용. 코드가 읽기쉬워짐.
*/
function solution(queue1, queue2) {
    let sumQueue1 = queue1.reduce((pre,cur)=>pre+cur,0)
    let sumQueue2 = queue2.reduce((pre,cur)=>pre+cur,0)
    let nowStack = 0
    let nowQueue1Stack = 0
    let nowQueue2Stack = 0
    const mid = (sumQueue1+sumQueue2) / 2
    const maxStack = queue1.length + queue2.length+1

    //만약 처음부터 중간값이면 0번을 해도 같다.
    if(sumQueue1 === mid)return 0;
    if(!Number.isInteger(mid))return -1;

    let minResult = -1;

    let diff = sumQueue1 - sumQueue2
    const goalDiff = diff / 2
    //두 수의 차이가 절반이되면 서로가 같은수를 가지고있는것으로 판단. (모든 숫자 덧셈으로 인한 리소스 낭비 삭제)
    while(goalDiff != diff){
        //목표차이보다 현재 차이가 큰숫자라면 queue1을 뺀 후 queue2로 삽입. 
        //diff는 queue1 - queue2이므로 diff가 음수라면 queue2가 더 큰숫자. 즉 queue2를 
        if(goalDiff < diff){
            const shiftData = queue1[nowQueue1Stack]
            queue2.push(shiftData)
            diff -= shiftData
            nowQueue1Stack++
        }else{
            const shiftData = queue2[nowQueue2Stack]
            queue1.push(shiftData)
            diff += shiftData
            nowQueue2Stack++
        }
        nowStack++;
        // 최대 stack을 넘어가면 더이상 풀리지않는다. 반환.
        if(nowStack > maxStack)break;
    }  
    if(goalDiff === diff) minResult = nowStack;
    return minResult;
}


// 좀더 정리한 코드 * 성공 24번 20.81ms
function solution4(queue1, queue2) {
    let sumQueue1 = queue1.reduce((pre,cur)=>pre+cur,0)
    let sumQueue2 = queue2.reduce((pre,cur)=>pre+cur,0)
    let nowStack = 0
    let nowQueue1Stack = 0
    let nowQueue2Stack = 0
    const mid = (sumQueue1+sumQueue2) / 2
    const maxStack = queue1.length + queue2.length+1

    //만약 처음부터 중간값이면 0번을 해도 같다.
    if(sumQueue1 === mid)return 0;
    if(!Number.isInteger(mid))return -1;

    let minResult = -1;

    // 둘이 같은 숫자가 될때까지 반복
    while(sumQueue1 != sumQueue2){
        //queue1이 더 클때 해당값을 뺀뒤 삽입.
        if(sumQueue1 > sumQueue2){
            const shiftData = queue1[nowQueue1Stack]
            queue2.push(shiftData)
            sumQueue1 -= shiftData
            sumQueue2 += shiftData
            nowQueue1Stack++
        }else{
            const shiftData = queue2[nowQueue2Stack]
            queue1.push(shiftData)
            sumQueue1 += shiftData
            sumQueue2 -= shiftData
            nowQueue2Stack++
        }
        nowStack++;
        // 최대 stack을 넘어가면 더이상 풀리지않는다. 반환.
        if(nowStack > maxStack)break;
    }  
    if(sumQueue1 === sumQueue2) minResult = nowStack;
    return minResult;
}
console.log(solution4([1, 2, 3, 4], [1, 10, 1, 2]))