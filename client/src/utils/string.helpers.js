const checkStringLength = (str,minLengt,maxLength) => {
  return str && str.length<maxLength &&  str.length>minLengt
}
const templateReplace = (str,params) => {
  const names = Object.keys(params);
  const vals = Object.values(params);
  try {
    return names.length?new Function(...names, `return \`${str}\`;`)(...vals):str;
  } catch (e) {
    console.error('templateReplace',str,names,vals,e)
    return str
  }
}

export {checkStringLength,templateReplace}
