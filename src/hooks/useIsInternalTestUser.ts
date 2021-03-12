import { useAuth } from './useAuth';

export const useIsInternalTestUser = () => {
  const { user } = useAuth();

  return ['kozzztya@gmail.com', 'testerson@gmail.com'].includes(user?.email!);
};
