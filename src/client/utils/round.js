export function round(v, radix = 2) {
  const radixFactor = 10 ** radix;
  return Math.round(v * radixFactor) / radixFactor;
}

export function roundObject(obj, radix) {
  return Object.entries(obj).reduce((newObj, [key, value]) => {
    newObj[key] = round(value, radix);
    return newObj;
  }, {});
}
