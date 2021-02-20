export const getIsCanScroll = (scrollTargetId: string) => {
  return (document.getElementById(scrollTargetId)?.scrollHeight ?? 0) > window.innerHeight;
};
