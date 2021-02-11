import { Card, Typography, IconButton, Collapse, Icon } from '@material-ui/core';
import React from 'react';
import { useToggle } from 'react-use';
import styled from 'styled-components';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { SpeedDialIcon } from '@material-ui/lab';
import { grey } from '@material-ui/core/colors';

export interface ExpandableCardProps {
  defaultExpanded?: boolean;
  title: string;
}

const TitleWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(p) => (p.isExpanded ? '10px' : '6px')} 11px 6px 15px;

  cursor: pointer;
`;

const Content = styled.div`
  margin: 0 0 10px 15px;
`;

const IconStyled = styled(Icon)`
  color: ${grey[400]};
`;

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  defaultExpanded = true,
  title,
  children
}) => {
  const [isExpanded, toggleExpanded] = useToggle(defaultExpanded);

  return (
    <Card>
      <TitleWrapper onClick={toggleExpanded} isExpanded={isExpanded}>
        <Typography>{title}</Typography>

        <IconButton aria-expanded={isExpanded} aria-label="show more" size="small">
          <IconStyled>
            <SpeedDialIcon
              icon={<ExpandMore />}
              openIcon={<ExpandLess />}
              open={isExpanded}
              aria-label="show more"
            />
          </IconStyled>
        </IconButton>
      </TitleWrapper>

      <Collapse in={isExpanded} timeout="auto" mountOnEnter>
        <Content>{children}</Content>
      </Collapse>
    </Card>
  );
};
