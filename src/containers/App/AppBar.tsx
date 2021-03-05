import React, { useCallback } from 'react';
import { Header } from '../../components/Header';
import { Balance } from '../Balance/Balance';
import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { useIsExpandedDrawer } from '../../hooks/useIsExpandedDrawer';

export const AppBar: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const { goBackCb, isNested } = useNavigationHelpers();
  const { isExpandedDrawer, setIsExpandedDrawer } = useIsExpandedDrawer();

  const onMenuClick = useCallback(() => {
    setIsExpandedDrawer(!isExpandedDrawer);
  }, [isExpandedDrawer, setIsExpandedDrawer]);

  return (
    <Header
      title="Life Balancer"
      onMenuClick={onMenuClick}
      onBackClick={goBackCb('EntriesByDay')}
      isShowBack={isNested}
      rightContent={isAuthenticated ? <Balance /> : <Button onClick={() => login()}>Login</Button>}
    />
  );
};
