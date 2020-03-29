function getRandom(min = 0, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}

function test() {
  let list = [];
  const target = [1,2,3,6,7,8,9,10,11];
  const randomSeatIndex = 1;
  const randomSeat = target[randomSeatIndex];
  list.push(randomSeat);
  
  let isRight = true;
  let leftStep = 1;
  let rightStep = 1;
  while(list.length < 4) {
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
  
  console.log(list.sort((a, b) => a - b));
}

test();