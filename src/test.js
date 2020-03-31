const SectorSeats = require('./index');
const utils = require('./utils');

const allSeats = {
  A: new SectorSeats(),
  B: new SectorSeats(),
  C: new SectorSeats(),
  D: new SectorSeats(),
};

// 从 A、B、C、D 四个区域中随机获取一个
function getRandomArea(areas) {
  return areas[Math.floor(Math.random()*areas.length)];
}

console.log(getRandomArea(['A', 'B', 'C', 'D']));

// 测试多次购票
function test() {
  // 总售出票数
  let totalSelled = 0;
  for (let n = 1; n <= 2000; n++) {
    const areas = ['A', 'B', 'C', 'D'];
    const area = getRandomArea(areas);
    // 每次取票张数
    const size = utils.getRandom(1, 5);
    console.log(`***第 ${n} 次，本次购票 ${size} 张: ***`);
    const seats = allSeats[area].get(size);
    if(seats && seats.length) {
      console.log(seats);
      for(const seat of seats) {
        const { line, column }= utils.getPostion(seat);
        console.log(`${area} 区: ${line} 排, ${column} 座`);
      }
    } else {
      console.log('购票失败');
    }
    
    totalSelled += seats.length;
    console.log(`已售出 ${totalSelled} 张票`);
    console.log(`总剩余 ${1950 * 4 - totalSelled} 张票`);
  }
}
test();