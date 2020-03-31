const utils = require('./utils');

function initSeat() {
  const seatArray = [];
  for (let n = 1; n <= 1950; n++) {
    seatArray.push(n);
  }
  return seatArray;
}

function initSeatMap(seats, num) {
  const seatMap = {};
  for (let key = 1; key <= num; key++) {
    seatMap[key] = [...seats];
  }
  return seatMap;
}

let seatMap = initSeatMap(initSeat(1950), 5);

function updateSeatList(orignSeatList, seats) {
  const seatList = [...orignSeatList];
  let removeList = [...seats];

  for (const item of removeList) {
    seatList.splice(seatList.indexOf(item), 1);
  }
  return seatList;
}

function updateSeatMap(seats) {
  for (let num = 1; num <= 5; num++) {
    seatMap[num] = updateSeatList(seatMap[num], seats);
  }
}

// 随机从数组中获取一个座位
function getRandomSeat(seatList) {
  const randomSeatIndex = utils.getRandom(0, seatList.length - 1);
  return {
    currentIndex: randomSeatIndex,
    currentSeat: seatList[randomSeatIndex]
  };
}

function getSeat(num) {
  let res = [];
  const seatList = seatMap[num];

  if (seatList.length === 0) {
    return [];
  }
  const { currentIndex, currentSeat } = getRandomSeat(seatList);
  res.push(currentSeat);

  let isRight = false;
  let leftStep = 1;
  let rightStep = 1;
  while (res.length < num) {
    // 向右走
    if (isRight) {
      const right_next = seatList[currentIndex + rightStep];
      if (right_next === currentSeat + rightStep) {
        res.push(right_next);
      } else {
        isRight = false;
      }
      rightStep += 1;
    } else {
      if (seatList[currentIndex - leftStep]) {
        res.push(seatList[currentIndex - leftStep]);
      } else {
        break;
      }
      leftStep += 1;
    }
  }
  res = res.sort((a, b) => a - b);
  updateSeatMap(res);
  return res;
}

function get(num) {
  let res = getSeat(num);
  if (res.length === 0 && num > 1) {
    // 分开买票
    res = [...get(num - 1), ...get(1)];
    if (res.length != num) {
      return [];
    }
  }
  return res;
}

// 测试多次购票
function test() {
  // 总售出票数
  let totalSelled = 0;
  for (let n = 1; n <= 1000; n++) {
    // 每次取票张数
    const size = utils.getRandom(1, 5);
    console.log(`***第 ${n} 次，本次购票 ${size} 张: ***`);
    const seats = get(size);
    if(seats && seats.length) {
      console.log(seats);
      for(const seat of seats) {
        const { line, column }= utils.getPostion(seat);
        console.log(`line: ${line}, column: ${column}`);
      }
    } else {
      console.log('购票失败');
    }
    
    totalSelled += seats.length;
    console.log(`已售出 ${totalSelled} 张票`);
    console.log(`剩余 ${1950 - totalSelled} 张票`);
  }
}
test();
