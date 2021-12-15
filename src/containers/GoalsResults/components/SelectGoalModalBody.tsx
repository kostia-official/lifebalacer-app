import {
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Checkbox,
  ListSubheader,
  Radio,
  Button
} from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { makeModal } from '../../../hooks/useModal';
import { DurationType } from '../../../generated/apollo';
import { Emoji } from '../../../components/Emoji';
import { useGoalsResultsFilters } from '../hooks/useGoalsResultsFilters';
import { useGoals } from '../../../hooks/apollo/useGoals';
import { FlexBox } from '../../../components/FlexBox';
import {
  ModalTitle,
  ModalContent,
  ModalActions,
  ModalSubListContainer
} from '../../../components/Modal';

export const useSelectGoalModal = makeModal();

export const SelectGoalModalBody: React.FC = () => {
  const { closeModal } = useSelectGoalModal();
  const { goals } = useGoals();

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

  const selectGoal = (_id: string) => () => {
    setGoalsIds((prev) =>
      prev.includes(_id) ? prev.filter((prevId) => prevId !== _id) : [...prev, _id]
    );
  };

  const selectDuration = (durationType: DurationType) => () => {
    setDuration(durationType);
  };

  return (
    <>
      <ModalTitle onClose={closeModal}>Filters</ModalTitle>

      <ModalContent dividers>
        <List>
          <ListSubheader disableSticky>Goals</ListSubheader>
          <ModalSubListContainer>
            {goals?.map((goal) => {
              const {
                _id,
                activity: { name, emoji }
              } = goal;

              return (
                <ListItem key={_id} button onClick={selectGoal(_id)}>
                  <ListItemText
                    primary={
                      <FlexBox row gap={4} centerY>
                        <Emoji>{emoji}</Emoji>
                        {name}
                      </FlexBox>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      color="primary"
                      value={_id}
                      checked={goalsIds?.includes(_id)}
                      onClick={selectGoal(_id)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </ModalSubListContainer>

          <ListSubheader>Duration</ListSubheader>

          <ModalSubListContainer>
            <ListItem button onClick={selectDuration(DurationType.Month)}>
              <ListItemText primary="Month" />
              <ListItemSecondaryAction>
                <Radio
                  edge="end"
                  color="primary"
                  value={DurationType.Month}
                  checked={duration === DurationType.Month}
                  onChange={selectDuration(DurationType.Month)}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button onClick={selectDuration(DurationType.Week)}>
              <ListItemText primary="Week" />
              <ListItemSecondaryAction>
                <Radio
                  edge="end"
                  color="primary"
                  value={DurationType.Week}
                  checked={duration === DurationType.Week}
                  onChange={selectDuration(DurationType.Week)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </ModalSubListContainer>
        </List>
      </ModalContent>

      <ModalActions>
        <Button variant="text" onClick={clearAll}>
          Clear all
        </Button>

        <Button variant="contained" color="primary" onClick={apply}>
          Apply
        </Button>
      </ModalActions>
    </>
  );
};
