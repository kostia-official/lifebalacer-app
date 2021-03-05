import React, { useEffect, useMemo } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Showable } from '../../components/Showable';
import { Spinner } from '../../components/Spinner';
import styled from 'styled-components';
import { useScrolling, createGlobalState } from 'react-use';
import { DrawerContainer } from './DrawerContainer';
import { useDeviceMediaQuery } from '../../hooks/useDeviceMediaQuery';
import { Fragment } from 'react';

export interface PageWrapperProps {
  isLoading?: boolean;
  errorMessage?: string;
  errorTime?: number;
  id?: string;
}

const Scroll = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 94vh; // TODO: Fix tech debt. With 100% or 100vh in anon stack don't show full content

  width: 100%;
`;

const ContentWrapper = styled.div`
  margin: 8px;
`;

const Wrapper = styled.div`
  display: flex;
`;

export const useIsScrolling = createGlobalState(false);

export const ScreenWrapper: React.FC<PageWrapperProps> = ({
  errorMessage,
  errorTime = Date.now(),
  isLoading = false,
  children,
  id
}) => {
  const [, setIsScrolling] = useIsScrolling();
  const scrollRef = React.useRef(null);
  const scrolling = useScrolling(scrollRef);

  const { isDesktop } = useDeviceMediaQuery();

  useEffect(() => {
    setIsScrolling(scrolling);
  }, [scrolling, setIsScrolling]);

  const content = useMemo(() => {
    return (
      <Scroll {...{ id }} ref={scrollRef}>
        <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

        <Showable isShow={isLoading}>
          <Spinner />
        </Showable>

        <Showable isShow={!isLoading}>
          <ContentWrapper>{children}</ContentWrapper>
        </Showable>
      </Scroll>
    );
  }, [children, errorMessage, errorTime, id, isLoading]);

  return isDesktop ? (
    <Wrapper>
      <DrawerContainer />

      {content}
    </Wrapper>
  ) : (
    <Fragment>{content}</Fragment>
  );
};
