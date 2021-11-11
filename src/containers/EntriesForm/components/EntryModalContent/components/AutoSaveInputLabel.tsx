import React from 'react';
import { FlexBox } from '../../../../../components/FlexBox';
import { InputLabel } from '@material-ui/core';
import { AutoSaveSpinner } from './AutoSaveSpinner';

export interface AutoSaveInputLabelProps {
  label: string;
  isLoading?: boolean;
}

export const AutoSaveInputLabel: React.FC<AutoSaveInputLabelProps> = ({ label, isLoading }) => {
  return (
    <FlexBox row gap={8} centerY>
      <InputLabel>{label}</InputLabel>
      <AutoSaveSpinner isLoading={isLoading} />
    </FlexBox>
  );
};
