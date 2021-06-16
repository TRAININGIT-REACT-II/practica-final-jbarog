const checkStringLength = (str,minLengt,maxLength) => {
  return str && str.length<maxLength &&  str.length>minLengt
}

export {checkStringLength}
