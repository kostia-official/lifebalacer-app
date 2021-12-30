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
import React, { useCallback } from 'react';
import { makeModal } from '../../../../../hooks/useModal';
import { DurationType } from '../../../../../generated/apollo';
import { Emoji } from '../../../../../components/Emoji';
import { useGoals } from '../../../../../hooks/apollo/useGoals';
import { FlexBox } from '../../../../../components/FlexBox';
import {
  ModalTitle,
  ModalContent,
  ModalActions,
  ModalSubListContainer
} from '../../../../../components/Modal';
import { useGoalsResultsOptions } from '../GoalsResultsOptions';

export const useSelectGoalModal = makeModal();

export const GoalsResultsOptionsModalBody: React.FC = () => {
  const { closeModal } = useSelectGoalModal();
  const { goals } = useGoals();

  const {
    applyOptions,
    clearOptions,
    selectedOptions: { goalsIds, duration },
    setSelectedOptions
  } = useGoalsResultsOptions();

  const apply = useCallback(() => {
    applyOptions();
    closeModal();
  }, [applyOptions, closeModal]);

  const clearAll = useCallback(() => {
    clearOptions();
    closeModal();
  }, [clearOptions, closeModal]);

  const selectGoal = (_id: string) => () => {
    setSelectedOptions((prev) => ({
      goalsIds: prev.goalsIds.includes(_id)
        ? prev.goalsIds.filter((prevId) => prevId !== _id)
        : [...prev.goalsIds, _id]
    }));
  };

  const selectDuration = (durationType: DurationType) => () => {
    setSelectedOptions({ duration: durationType });
  };

  return (
    <>
      <ModalTitle onClose={closeModal}>Options</ModalTitle>

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
