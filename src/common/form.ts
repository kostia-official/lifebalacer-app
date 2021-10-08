export const parseFloatValue = (value: string) => {
  if (value === '') return null;

  return Number.isNaN(parseFloat(value)) ? value : parseFloat(value);
};

export const parseIntValue = (value: string) => {
  if (value === '') return null;

  return Number.isNaN(parseInt(value)) ? value : parseInt(value);
};
