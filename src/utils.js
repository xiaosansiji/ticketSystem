// 计算当前行座位数量
// 入参 N 排
function getSeatsCountByLine(n) {
  if (n === 1) {
    return 50;
  }
  return 50 + 2 * (n - 1);
}

// const line26 = getSeatsCountByLine(26);
// console.log('line 26 count:', line26);

// 计算总座位数量
// 入参 N 排
function getSeatsCountTotal(n) {
  return (n * (50 + 50 + 2 * (n - 1))) / 2;
}

// 二元一次方程求解
function calculate(a, b, c) {
  if (b * b - 4 * a * c < 0) {
    return 0;
  }
  const x1 = ((-b - Math.pow(b * b - 4 * a * c, 1 / 2)) / 2) * a;
  const x2 = ((-b + Math.pow(b * b - 4 * a * c, 1 / 2)) / 2) * a;
  return Math.max(x1, x2);
}

// 根据序号，获取行、列号
function getPostion(order) {
  // n * (98 + 2 * n) = 2 * order;
  // 98 * n + 2 * n * n = 2 * order;
  // 49 * n + n * n = order;
  const line = Math.ceil(calculate(1, 49, -order));
  const column = order - getSeatsCountTotal(line - 1);
  return {
    line,
    column,
  };
}
// getPostion(1941);
// const count26 = getSeatsCountTotal(26);
// console.log('total 26 count:', count26);

function getRandom(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  getPostion,
  getRandom,
};
