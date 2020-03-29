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


// 扇形区域座位，以二维数据方式表示
const sectorArray = [];

function initArray() {
  for(let m = 1; m <= 26; m++) {
    const maxN = getSeatsCountByLine(m);
    const line = [];
    for(let n = 1; n <= maxN; n++) {
      line.push({
        line: m,
        column: n,
        isSeatAvailable: true,
      });
    }
    sectorArray.push(line);
  }
}
initArray();

function isOk(m, n) {
  return sectorArray[m] && sectorArray[m][n] && sectorArray[m][n].isSeatAvailable;
}

// 获取相邻的一个位置
function getAdjacentSeat(m, n) {
  if(isOk(m, n)) {
    return sectorArray[m][n];
  } else if(isOk(m, n + 1)) {
    // 右
    return sectorArray[m][n + 1];
  } else if (isOk(m, n - 1)) {
    // 左
    return sectorArray[m][n - 1];
  } else if (isOk(m - 1, n)) {
    // 前
    return sectorArray[m - 1][n];
  } else if (isOk(m - 1, n + 1)) {
    // 前、右
    return sectorArray[m - 1][n + 1];
  } else if (isOk(m - 1, n - 1)) {
    // 前、左
    return sectorArray[m - 1][n - 1];
  } else if (isOk(m + 1, n)) {
    // 后
    return sectorArray[m + 1][n];
  } else if (isOk(m + 1, n + 1)) {
    // 后、右
    return sectorArray[m + 1][n + 1];
  } else if (isOk(m + 1, n - 1)) {
    // 后、左
    return sectorArray[m + 1][n - 1];
  }
  return null;
}

function getSeats(size) {
  const array = [];
  const m = getRandom(0, 26);
  const maxN = getSeatsCountByLine(m);
  const n = getRandom(0, maxN);
  // 本次查询次数
  let queryCount = 1;
  while(queryCount < 10) {
    const seat = getAdjacentSeat(m, n);
    queryCount++;
    if(seat) {
      array.push(seat);
      seat.isSeatAvailable = false;
    }
  }
  if(array.length < size) {
    // console.log('购票失败');
    // return [];
    return getSeats(size);
  } else {
    return array;
  }
}
getSeats(5);

// 测试多次购票
function test() {
  for(let n = 1; n <= 100; n++) {
    // 每次取票张数
    const size = getRandom(1, 5);
    console.log(`***第 ${n} 次，本次购票 ${size} 张: ***`);
    const target = getSeats(size);
    for(const seat of target) {
      console.log(`${seat.line} 行,${seat.column} 列`);
    }
  }
}
test();