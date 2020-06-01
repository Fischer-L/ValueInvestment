export function round(v) {
  return Math.round(v * 100) / 100;
}

export function roundObject(obj) {
  return Object.entries(obj).reduce((newObj, [key, value]) => {
    newObj[key] = round(value);
    return newObj;
  }, {});
}
