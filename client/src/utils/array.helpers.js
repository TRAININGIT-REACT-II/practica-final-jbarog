const identityFn = x=>x;

const arrayToObject = (array,keyFn=identityFn,valueFn=identityFn) => array.reduce(
  (obj, item) => ({
    ...obj,
    [keyFn(item)]: valueFn(item)
  }),
{});

const updateArrayIndex = (array,index,updateFn=identityFn)=>{
  const newArray = [
    ...array.slice(0, index),
    updateFn(array[index]),
    ...array.slice(index + 1)
  ]
  return newArray;
}

export {arrayToObject, updateArrayIndex}
