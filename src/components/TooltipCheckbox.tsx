import React, { useCallback, useState } from 'react';
import {
  Checkbox,
  Typography,
  Tooltip,
  IconButton,
  Icon,
  FormControlLabel
} from '@material-ui/core';
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';

export interface TooltipCheckboxProps {
  checked: boolean;
  onChange: SwitchBaseProps['onChange'];
  text: string;
  tooltipContent: NonNullable<React.ReactNode>;
}

const CheckboxLabel = styled.div`
  display: flex;
  align-items: center;
`;

const IconStyled = styled(Icon)`
  color: ${grey[400]};
`;

export const TooltipCheckbox: React.FC<TooltipCheckboxProps> = ({
  checked,
  onChange,
  text,
  tooltipContent
}) => {
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  const showTooltip = useCallback(() => setIsShowTooltip(true), []);
  const hideTooltip = useCallback(() => setIsShowTooltip(false), []);

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} color="primary" onChange={onChange} />}
      label={
        <CheckboxLabel>
          <Typography>{text}</Typography>
          <Tooltip
            title={tooltipContent}
            placement="right"
            onClose={hideTooltip}
            open={isShowTooltip}
            disableTouchListener
            disableHoverListener
          >
            <IconButton edge="end" onClick={showTooltip}>
              <IconStyled fontSize="small">info</IconStyled>
            </IconButton>
          </Tooltip>
        </CheckboxLabel>
      }
    />
  );
};
