import React from 'react';

export const useAnchorEl = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return { anchorEl, handleClick, handleClose, open: !!anchorEl };
};
