export const getIsCanScroll = (scrollTargetId: string) => {
  const scrollTarget = document.getElementById(scrollTargetId);

  return (scrollTarget?.scrollHeight ?? 0) > window.innerHeight;
};
