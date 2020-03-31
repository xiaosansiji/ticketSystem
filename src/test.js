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

function getRandomSeat() {
  
}

// 测试多次购票
function test() {
  // 总售出票数
  let totalSelled = 0;
  for (let n = 1; n <= 3000; n++) {
    let areas = ['A', 'B', 'C', 'D'];
    let area = '';
    // 每次取票张数
    const size = utils.getRandom(1, 5);
    let seats = [];
    console.log(`***第 ${n} 次，本次购票 ${size} 张: ***`);
  
    // 选座失败时，尝试在其他区域内选座
    while(areas.length) {
      if(seats && seats.length) {
        break;
      } else {
        area = getRandomArea(areas);
        seats = allSeats[area].get(size);
        areas.splice(areas.indexOf(area), 1);
      }
    }

    if(seats && seats.length) {
      console.log(seats);
      for(const seat of seats) {
        const { line, column }= utils.getPostion(seat);
        console.log(`${area} 区: ${line} 排, ${column} 座`);
      }
      totalSelled += seats.length;
    } else {
      console.log('购票失败');
    }
    
    console.log(`已售出 ${totalSelled} 张票`);
    console.log(`总剩余 ${1950 * 4 - totalSelled} 张票`);
  }
}
test();