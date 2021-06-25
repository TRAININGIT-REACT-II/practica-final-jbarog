const storeObject = (key, data) => {
  const parsedValue = data && JSON.stringify(data);
  return localStorage.setItem(key, parsedValue);
}
const getStoredObject = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue && JSON.parse(storedValue);
}

export {storeObject,getStoredObject}
