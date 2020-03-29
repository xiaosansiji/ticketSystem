
function getContinuityCount(list) {
  console.log(list);
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
  const target = [1,2,3,6,7,8,9,10,11,13];
  const len = list.length;
  const start = target.findIndex(item => item === list[0]);

  if(start > -1) {
    // 向后找连续座位，若不连续，则删除不连续部分
    const nextContinuityCount = getContinuityCount(target.slice(start + len, start + len + size));
    console.log('nextContinuityCount', nextContinuityCount);
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
  console.log(target);
}

updataMap(3, [7,8,9]);