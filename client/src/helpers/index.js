export function paginationArray(array) {
  let resultArray = [];
  let count = 0;
  let eightElmentsArray = [];

  for (const element of array) {
    if(count === 8){
      resultArray.push(eightElmentsArray);
      count = 0;
      eightElmentsArray = [];
    }
    eightElmentsArray.push(element)
    count++;
  }
  resultArray.push(eightElmentsArray);
  return resultArray;
}

export function orderArray(array, option) {
console.log("🚀 ~ file: index.js ~ line 19 ~ orderArray ~ option", option)
console.log("🚀 ~ file: index.js ~ line 19 ~ orderArray ~ array", array)

  function SortArrayByNameAsc(x, y){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

  function SortArrayByNameDesc(x, y){
    if (x.name > y.name) {return -1;}
    if (x.name < y.name) {return 1;}
    return 0;
  }

  function SortArrayByWeight(x, y){
    if (parseInt(x.weight.metric.slice(0,2)) < parseInt(y.weight.metric.slice(0,2))) {return -1;}
    if (parseInt(x.weight.metric.slice(0,2) > parseInt(y.weight.metric.slice(0,2)))) {return 1;}
    return 0;
  }

  switch (option) {
    case 'asc':
      return array.sort(SortArrayByNameAsc);
    case 'desc':
      return array.sort(SortArrayByNameDesc);
    case 'weight':
      return array.sort(SortArrayByWeight);
    default:
      break;
  }
}


// var a = [
// 	{FirsName:"Ellie", LastName:"Williams"},
// 	{FirstName:"Lara", LastName : "Croft"}
// ];
// function SortArray(x, y){
//     if (x.LastName < y.LastName) {return -1;}
//     if (x.LastName > y.LastName) {return 1;}
//     return 0;
// }
// var s = a.sort(SortArray);
// console.log(s);
