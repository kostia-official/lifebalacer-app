import { TextField, CircularProgress, Fade } from '@material-ui/core';
import React from 'react';
import { useFocusOnTheEnd } from '../../hooks/useFocusOnTheEnd';
import { useDeviceMediaQuery } from '../../hooks/useDeviceMediaQuery';
import { usePreventBlur } from '../../hooks/usePreventBlur';
import styled from 'styled-components';

export interface DescriptionTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  isFocusDescription: boolean;
  isLoading: boolean;
}

const AutoSaveWrapper = styled.div`
  align-self: flex-end;
  margin: 0 0 0 -12px;
  opacity: 0.6;
`;

export const DescriptionTextField: React.FC<DescriptionTextFieldProps> = ({
  value,
  onChange,
  isFocusDescription,
  isLoading
}) => {
  const { isDesktop } = useDeviceMediaQuery();
  const { onBlur, inputRef } = usePreventBlur({ preventTime: 1000 });
  const { onFocus } = useFocusOnTheEnd({ isAutoFocus: isFocusDescription });

  return (
    <TextField
      inputRef={inputRef}
      margin="normal"
      label="Description"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      multiline
      rowsMax={isDesktop ? 20 : 10}
      autoFocus={isFocusDescription}
      onBlur={onBlur}
      onFocus={onFocus}
      InputProps={{
        endAdornment: (
          <AutoSaveWrapper>
            <Fade in={isLoading} timeout={300}>
              <CircularProgress size={8} disableShrink />
            </Fade>
          </AutoSaveWrapper>
        )
      }}
    />
  );
};
