import { useState } from 'react';

export const useMountTime = () => {
  const [mountTime] = useState<number>(Date.now());

  return { mountTime };
};
