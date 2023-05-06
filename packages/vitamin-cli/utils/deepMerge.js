const isObj = (value) => value !== null && typeof value === "object";
const deepMergeArray = (a, b) => Array.from(new Set([...a, ...b]));

export const deepMerge = (target, obj) => {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = deepMergeArray(oldVal, newVal);
    } else if (isObj(oldVal) && isObj(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }

  return target;
};
