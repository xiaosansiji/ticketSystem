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

function updataMap(size, list) {
  const target = map[size];
  // console.log(target.length);
  const len = list.length;
  const start = target.findIndex(item => item === list[0]);

  if(start > -1) {
    // 删除已经被分配的子组
    target.splice(start, len);

    // 向后找连续座位，数量已经不满足当前数量限制，则删除
    const next = target.slice(start + size);
    if(next.length < size) {
      target.splice(start);
    }

    // 向前找连续座位，数量已经不满足当前数量限制，则删除
    const pre = target.slice(0, start);
    if(pre.length < size) {
      target.splice(0, list[0] - 1);
    }
  }
}

function getSeats(size) {
  let list = [];
  const target = map[size];
  const randomSeat = getRandom(0, target.length - 1);
  if(randomSeat > target.length - size) {
    // 由后向前获取连续座位
    list = target.slice(randomSeat - size, randomSeat);
  } else {
    // 由前向后获取连续座位
    list =  target.slice(randomSeat, randomSeat + size);
  }

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
  for(let n = 1; n <= 1000; n++) {
    // 每次取票张数
    const size = getRandom(1, 5);
    console.log(`***第 ${n} 次，本次购票 ${size} 张: ***`);
    console.log(getSeats(size));
  }
}
test();





