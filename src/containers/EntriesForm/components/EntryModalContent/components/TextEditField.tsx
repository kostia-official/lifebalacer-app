import { TextField } from '@material-ui/core';
import React from 'react';
import { useFocusOnTheEnd } from '../../../../../hooks/useFocusOnTheEnd';
import { useDeviceMediaQuery } from '../../../../../hooks/useDeviceMediaQuery';
import { usePreventBlur } from '../../../../../hooks/usePreventBlur';
import { FlexBox } from '../../../../../components/FlexBox';
import { AutoSaveInputLabel } from './AutoSaveInputLabel';

export interface DescriptionTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isFocusDescription: boolean;
  isLoading: boolean;
}

export const TextEditField: React.FC<DescriptionTextFieldProps> = ({
  label,
  value,
  onChange,
  isFocusDescription,
  isLoading
}) => {
  const { isDesktop } = useDeviceMediaQuery();
  const { onBlur, inputRef } = usePreventBlur({ preventTime: 1000 });
  const { onFocus } = useFocusOnTheEnd({ isAutoFocus: isFocusDescription });

  return (
    <FlexBox column gap={4}>
      <AutoSaveInputLabel label={label} isLoading={isLoading} />

      <TextField
        inputRef={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline
        rowsMax={isDesktop ? 20 : 10}
        autoFocus={isFocusDescription}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </FlexBox>
  );
};
