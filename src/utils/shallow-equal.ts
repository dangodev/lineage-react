export function isShallowEqual(obj1: any, obj2: any) {
  for (var key1 in obj1) {
    if (!(key1 in obj2) || obj1[key1] !== obj2[key1]) {
      return false;
    }
  }

  for (var key2 in obj2) {
    if (!(key2 in obj1) || obj1[key2] !== obj2[key2]) {
      return false;
    }
  }

  return true;
}
