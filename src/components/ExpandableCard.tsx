import { Card, Typography, IconButton, Collapse } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useToggle } from 'react-use';
import styled from 'styled-components';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { SpeedDialIcon } from '@material-ui/lab';
import { grey } from '@material-ui/core/colors';

export interface ExpandableCardProps {
  defaultExpanded?: boolean;
  shouldExpand?: boolean;
  title: string;
}

const TitleWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(p) => (p.isExpanded ? '10px' : '6px')} 11px 6px 15px;

  cursor: pointer;
`;

const SpeedDialIconStyled = styled(SpeedDialIcon)`
  color: ${grey[400]};
`;

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  defaultExpanded = true,
  shouldExpand,
  title,
  children
}) => {
  const [isExpanded, toggleExpanded] = useToggle(defaultExpanded);

  useEffect(() => {
    if (shouldExpand) toggleExpanded(true);
  }, [shouldExpand, toggleExpanded]);

  return (
    <Card>
      <TitleWrapper onClick={toggleExpanded} isExpanded={isExpanded}>
        <Typography>{title}</Typography>

        <IconButton aria-expanded={isExpanded} aria-label="show more" size="small">
          <SpeedDialIconStyled
            icon={<ExpandMore />}
            openIcon={<ExpandLess />}
            open={isExpanded}
            aria-label="show more"
          />
        </IconButton>
      </TitleWrapper>

      <Collapse in={isExpanded} timeout="auto" mountOnEnter>
        {children}
      </Collapse>
    </Card>
  );
};
