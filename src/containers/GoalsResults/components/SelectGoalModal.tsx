import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Checkbox,
  ListSubheader,
  Radio,
  DialogActions,
  Button
} from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { makeModal } from '../../../hooks/useModal';
import { useGetGoalsQuery, DurationType } from '../../../generated/apollo';
import { Emoji } from '../../../components/Emoji';
import styled from 'styled-components';
import { useGoalsResultsFilters } from '../hooks/useGoalsResultsFilters';

export const useSelectGoalModal = makeModal();

const DialogTitleStyled = styled(DialogTitle)`
  min-width: 300px;
  padding-bottom: 0;
`;

const DialogActionsStyled = styled(DialogActions)`
  display: flex;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  padding: 0 8px;
`;

export const SelectGoalModal: React.FC = () => {
  const { open, closeModal } = useSelectGoalModal();

  const { data } = useGetGoalsQuery();
  const goals = data?.goals;

  const { filters, setFilters, clearFilters } = useGoalsResultsFilters();

  const [duration, setDuration] = useState<DurationType | undefined>(filters?.duration);
  const [goalsIds, setGoalsIds] = useState<string[]>(filters?.goalsIds || []);

  const apply = useCallback(() => {
    setFilters({ duration, goalsIds });
    closeModal();
  }, [closeModal, duration, goalsIds, setFilters]);

  const clearAll = useCallback(() => {
    clearFilters();
    setDuration(undefined);
    setGoalsIds([]);
    closeModal();
  }, [clearFilters, closeModal]);

  return (
    <Dialog onClose={closeModal} open={open}>
      <DialogTitleStyled>Filters</DialogTitleStyled>

      <ContentWrapper>
        <List>
          <ListSubheader>Goal</ListSubheader>
          {goals?.map((goal) => {
            const {
              _id,
              activity: { name, emoji }
            } = goal;

            return (
              <ListItem key={_id}>
                <ListItemText
                  primary={
                    <span>
                      <Emoji>{emoji}</Emoji>
                      {name}
                    </span>
                  }
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    color="primary"
                    value={_id}
                    checked={goalsIds?.includes(_id)}
                    onChange={() => {
                      setGoalsIds((prev) =>
                        prev.includes(_id)
                          ? prev.filter((prevId) => prevId !== _id)
                          : [...prev, _id]
                      );
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}

          <ListSubheader>Duration</ListSubheader>

          <ListItem>
            <ListItemText primary="Month" />
            <ListItemSecondaryAction>
              <Radio
                edge="end"
                color="primary"
                value={DurationType.Month}
                checked={duration === DurationType.Month}
                onChange={() => setDuration(DurationType.Month)}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Week" />
            <ListItemSecondaryAction>
              <Radio
                edge="end"
                color="primary"
                value={DurationType.Week}
                checked={duration === DurationType.Week}
                onChange={() => setDuration(DurationType.Week)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </ContentWrapper>

      <DialogActionsStyled>
        <Button variant="text" onClick={clearAll}>
          Clear all
        </Button>

        <Button variant="contained" color="primary" onClick={apply}>
          Apply
        </Button>
      </DialogActionsStyled>
    </Dialog>
  );
};
