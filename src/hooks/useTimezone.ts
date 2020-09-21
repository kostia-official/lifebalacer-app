export const useTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
