export function getArrayPages(arr, pageSize = 5) {
  const result = {};
  let pageNum = 0;

  while (arr.length) {
    result[pageNum] = arr.splice(0, pageSize);
    pageNum += 1;
    console.log(result[pageNum]);
  }
  console.log(result);

  return result;
}
