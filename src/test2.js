//判断一串数字是否是连续的
function isContinuity(list) {
  let i = list[0];
  let isContinuation = true;
  for (const item of list) {
    if (item !== i) {
      isContinuation = false;
      break;
    }
    i++;
  }
  return isContinuation;
}

console.log(isContinuity([1, 2, 3]));
