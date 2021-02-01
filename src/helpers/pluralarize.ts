import pluralize from 'pluralize';

export const pluralLabel = (word: string, count = 0) => {
  return `${count} ${pluralize(word, count)}`;
};
