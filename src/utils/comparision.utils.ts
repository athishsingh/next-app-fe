export function isDataModified<T extends Record<string, any>>(
  initialPayload: T | undefined,
  newPayload: T | undefined
): boolean {
  if (!initialPayload || !newPayload) {
    return true;
  }

  if (Object.keys(initialPayload).length !== Object.keys(newPayload).length) {
    return true;
  }

  for (const key of Object.keys(initialPayload)) {
    const initialValue = initialPayload[key] ?? "";
    const newValue = newPayload[key] ?? "";

    if (Array.isArray(initialValue) && Array.isArray(newValue)) {
      if (isArrayModified(initialValue, newValue)) {
        return true;
      }
    } else if (isObject(initialValue) && isObject(newValue)) {
      if (isDataModified(initialValue, newValue)) {
        return true;
      }
    } else if (initialValue !== newValue) {
      return true;
    }
  }
  return false;
}

export const isArrayModified = (
  initialArray: Record<string, any>[],
  finalArray: Record<string, any>[]
): boolean => {
  if (initialArray.length !== finalArray.length) {
    return true;
  }

  const sortAndStringify = (array: Record<string, any>[]) =>
    array.map((item) => JSON.stringify(item, Object.keys(item).sort())).sort();

  const sortedInitialArray = sortAndStringify(initialArray);
  const sortedFinalArray = sortAndStringify(finalArray);

  for (let i = 0; i < sortedInitialArray.length; i++) {
    if (sortedInitialArray[i] !== sortedFinalArray[i]) {
      return true;
    }
  }

  return false;
};

const isObject = (value: unknown): value is Record<string, any> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
