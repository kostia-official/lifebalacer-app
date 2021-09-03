import React, { useCallback, useState } from 'react';
import {
  Checkbox,
  Typography,
  Tooltip,
  IconButton,
  FormControlLabel
} from '@material-ui/core';
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';

export interface TooltipCheckboxProps {
  checked: boolean;
  onChange: SwitchBaseProps['onChange'];
  text: string;
  tooltipContent: NonNullable<React.ReactNode>;
}

const Wrapper = styled.div`
  align-self: flex-start;
`;

const CheckboxLabel = styled.div`
  display: flex;
  align-items: center;
`;

const InfoIconStyled = styled(InfoIcon)`
  color: ${grey[400]};
  width: 20px;
`;

const FormControlLabelStyled = styled(FormControlLabel)`
  margin-right: 0;
`;

const IconButtonStyled = styled(IconButton)`
  padding: 10px;
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
    <Wrapper>
      <FormControlLabelStyled
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
              <IconButtonStyled edge="end" onClick={showTooltip}>
                <InfoIconStyled />
              </IconButtonStyled>
            </Tooltip>
          </CheckboxLabel>
        }
      />
    </Wrapper>
  );
};
