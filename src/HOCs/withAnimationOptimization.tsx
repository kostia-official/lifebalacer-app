import React, { Fragment, useState } from 'react';
import { InteractionManager } from 'react-native';
import { useMount } from 'react-use';

export const withAnimationOptimization = <P extends object>(Component: React.ComponentType<P>) =>
  function Child(props: P) {
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    useMount(() => {
      const interactionPromise = InteractionManager.runAfterInteractions(() =>
        setIsAnimationFinished(true)
      );

      return () => interactionPromise.cancel();
    });

    return <Fragment>{isAnimationFinished && <Component {...props} />}</Fragment>;
  };
