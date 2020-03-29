// 计算当前行座位数量
// 入参 N 排
function getSeatsCountByLine(n) {
  if(n === 1) {
    return 50;
  }
  return 50 + 2 * (n-1);
}

const line26 = getSeatsCountByLine(26);
// console.log('line 26 count:', line26);

// 计算总座位数量
// 入参 N 排
function getSeatsCountTotal(n) {
  return n * (50 + 50 + 2 * (n-1)) / 2;
}

const count26 = getSeatsCountTotal(26);
// console.log('total 26 count:', count26);

const maxDistance = Math.sqrt(26 * 26 + 100 * 100);
// console.log('maxDistance', maxDistance);

function getRandom(min = 0, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}

// console.log('getRandom', getRandom(0, 26));


const seatArray = [];
for(let n = 0; n < 1950; n++) {
  seatArray.push(n);
}

// console.log(seatArray);

const map = {
  5: seatArray,
  4: seatArray,
  3: seatArray,
  2: seatArray,
  1: seatArray,
};

// 判断是否连续
function getContinuityCount(list) {
  let continuityCount = 1;
  for (let i = 0; i < list.length; i++) {
    if (list[i] + 1 === list[i+1]) {
      continuityCount++;
    } else {
      break;
    }
  }
  return continuityCount;
}

function updataMap(size, list) {
  const target = map[size];
  const len = list.length;
  const start = target.findIndex(item => item === list[0]);

  if(start > -1) {
    // 向后找连续座位，若不连续，则删除不连续部分
    const nextContinuityCount = getContinuityCount(target.slice(start + len, start + len + size));
    if(nextContinuityCount !== size) {
      target.splice(start + len, nextContinuityCount);
    }

    // 删除已经被分配的子组
    target.splice(start, len);

    // 向前找连续座位，若不连续，则删除不连续部分
    const preContinuityCount = getContinuityCount(target.slice(start - len, start));
    if(preContinuityCount !== size) {
      target.splice(start - preContinuityCount + 1, start - 1);
    }
  }
}

function getSeats(size) {
  let list = [];
  const target = map[size];
  const randomSeatIndex = getRandom(0, target.length - 1);
  const randomSeat = target[randomSeatIndex];
  list.push(randomSeat);
  
  let isRight = true;
  let leftStep = 1;
  let rightStep = 1;
  while(list.length < size) {
    if(isRight) {
      if(target[randomSeatIndex + rightStep ] === randomSeat + rightStep) {
        list.push(target[randomSeatIndex + rightStep ]);
        rightStep++;
      } else {
        isRight = false;
      }
    } else {
      if(target[randomSeatIndex - leftStep ] === randomSeat - leftStep) {
        list.push(target[randomSeatIndex - leftStep ]);
        leftStep++;
      } else {
        isRight = true;
      }
    }
  }

  list = list.sort((a, b) => a - b);
  if(list.length === size) {
    for(let n = 1; n <= 5; n++) {
      updataMap(size, list);
    }
    return list;
  }
  return [];
}
// console.log(getSeats(5));

// 测试多次购票
function test() {
  // 总售出票数
  let totalSelled = 0;
  for(let n = 1; n <= 200; n++) {
    // 每次取票张数
    const size = getRandom(1, 5);
    console.log(`***第 ${n} 次，本次购票 ${size} 张: ***`);
    const seats = getSeats(size);
    console.log(seats);
    totalSelled += seats.length;
    console.log(`已售出 ${totalSelled} 张票`);
    console.log(`剩余 ${1950 - totalSelled} 张票`);
  }
}
test();





