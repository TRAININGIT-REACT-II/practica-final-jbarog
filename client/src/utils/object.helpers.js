const objectMap = (object, mapFn) => Object.keys(object).reduce((result,key)=>({
  ...result,
  [key]: mapFn(object[key])
}), {});


export {objectMap}
