export const isDeepEqual = (first: unknown, second: unknown): boolean => {
  return JSON.stringify(first) === JSON.stringify(second);
};
