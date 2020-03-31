function getSeatsCountByLine(n) {
  if (n === 1) {
    return 50;
  }
  return 50 + 2 * (n - 1);
}
function getSeatsCountTotal(n) {
  return (n * (50 + 50 + 2 * (n - 1))) / 2;
}
console.log(getSeatsCountTotal(17));