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
class SectorSeats {
  constructor() {
    this.seatMap = initSeatMap(initSeat(1950), 5);
  }

  get(num) {
    let res = this.getSeat(num);
    if (res.length === 0 && num > 1) {
      // 分开买票
      res = [...this.get(num - 1), ...this.get(1)];
      if (res.length != num) {
        return [];
      }
    }
    return res;
  }

  getSeat(num) {
    let res = [];
    const seatList = this.seatMap[num];
  
    if (seatList.length === 0) {
      return [];
    }
    const { currentIndex, currentSeat } = this.getRandomSeat(seatList);
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
    this.updateSeatMap(res);
    return res;
  }

  getRandomSeat(seatList) {
    const randomSeatIndex = utils.getRandom(0, seatList.length - 1);
    return {
      currentIndex: randomSeatIndex,
      currentSeat: seatList[randomSeatIndex]
    };
  }

  updateSeatMap(seats) {
    for (let num = 1; num <= 5; num++) {
      this.seatMap[num] = this.updateSeatList(this.seatMap[num], seats);
    }
  }

  updateSeatList(orignSeatList, seats) {
    const seatList = [...orignSeatList];
    let removeList = [...seats];
  
    for (const item of removeList) {
      seatList.splice(seatList.indexOf(item), 1);
    }
    return seatList;
  }
}

module.exports = SectorSeats;