import React, { useEffect, useMemo } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Showable } from './Showable';
import { Spinner } from './Spinner';
import styled from 'styled-components';
import { useScrolling, createGlobalState } from 'react-use';

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
`;

const ContentWrapper = styled.div`
  margin: 8px;
`;

export const useIsScrolling = createGlobalState(false);

export const PageWrapper: React.FC<PageWrapperProps> = ({
  errorMessage,
  errorTime = Date.now(),
  isLoading = false,
  children,
  id
}) => {
  const [, setIsScrolling] = useIsScrolling();
  const scrollRef = React.useRef(null);
  const scrolling = useScrolling(scrollRef);

  useEffect(() => {
    setIsScrolling(scrolling);
  }, [scrolling, setIsScrolling]);

  return useMemo(() => {
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
};
