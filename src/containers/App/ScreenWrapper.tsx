import React, { useEffect, useMemo, Fragment } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Showable } from '../../components/Showable';
import { Spinner } from '../../components/Spinner';
import styled from 'styled-components';
import { useScrolling, createGlobalState } from 'react-use';
import { DrawerContainer } from '../DrawerContainer';
import { useDeviceMediaQuery } from '../../hooks/useDeviceMediaQuery';
import { useScrollToTop } from '@react-navigation/native';
import { useScreenHeight } from '../../hooks/useScreenHeight';

export interface PageWrapperProps {
  isLoading?: boolean;
  errorMessage?: string;
  errorTime?: number;
  id?: string;
  unmountOnHide?: boolean;
}

const Scroll = styled.div<{ $height: string }>`
  overflow-x: hidden;
  overflow-y: scroll;
  height: ${(p) => p.$height};

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
  id,
  unmountOnHide
}) => {
  const [, setIsScrolling] = useIsScrolling();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrolling = useScrolling(scrollRef);

  const { isDesktop } = useDeviceMediaQuery();
  const screenHeight = useScreenHeight();

  useEffect(() => {
    setIsScrolling(scrolling);
  }, [scrolling, setIsScrolling]);

  useScrollToTop(
    React.useRef({
      scrollToTop: () => {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })
  );

  const content = useMemo(() => {
    return (
      <Scroll {...{ id }} ref={scrollRef} $height={screenHeight}>
        <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

        <Showable isShow={isLoading} unmountOnHide={unmountOnHide}>
          <Spinner />
        </Showable>

        <Showable isShow={!isLoading} unmountOnHide={unmountOnHide}>
          <ContentWrapper>{children}</ContentWrapper>
        </Showable>
      </Scroll>
    );
  }, [unmountOnHide, children, errorMessage, errorTime, id, isLoading, screenHeight]);

  return isDesktop ? (
    <Wrapper>
      <DrawerContainer />

      {content}
    </Wrapper>
  ) : (
    <Fragment>{content}</Fragment>
  );
};
