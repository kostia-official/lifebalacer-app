import React, { useCallback } from 'react';
import {
  ModalTitle,
  ModalContent,
  ModalSubListContainer,
  ModalActions
} from '../../../../../components/Modal';
import {
  List,
  ListSubheader,
  Button,
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import {
  useJournalOptionsModal,
  useJournalOptions,
  JournalMediaOptionsData
} from '../JournalOptions';
import { ActivitySelect } from '../../../../../components/ActivitySelect';
import { ActivityFragment } from '../../../../../generated/apollo';

export interface JournalOptionsModalBodyProps {
  allActivities: ActivityFragment[];
}

export const JournalOptionsModalBody: React.FC<JournalOptionsModalBodyProps> = ({
  allActivities
}) => {
  const { closeModal } = useJournalOptionsModal();

  const {
    applyOptions,
    clearOptions,
    selectedOptions: { activityId, isWithImages, isWithVideos },
    setSelectedOptions
  } = useJournalOptions();

  const apply = useCallback(() => {
    applyOptions();
    closeModal();
  }, [applyOptions, closeModal]);

  const clearAll = useCallback(() => {
    clearOptions();
    closeModal();
  }, [clearOptions, closeModal]);

  const setActivityId = (activityId: string | undefined) => {
    setSelectedOptions({ activityId });
  };

  const toggleMediaOption = useCallback(
    (optionKey: keyof JournalMediaOptionsData) => () => {
      setSelectedOptions((prev) => ({ [optionKey]: !prev[optionKey] }));
    },
    [setSelectedOptions]
  );

  return (
    <>
      <ModalTitle onClose={closeModal}>Options</ModalTitle>

      <ModalContent dividers>
        <List>
          <ListSubheader disableSticky>Activity</ListSubheader>
          <ModalSubListContainer>
            <ListItem>
              <ActivitySelect
                value={activityId}
                activities={allActivities}
                onSelect={setActivityId}
              />
            </ListItem>
          </ModalSubListContainer>
        </List>

        <List>
          <ListSubheader>Media</ListSubheader>

          <ModalSubListContainer>
            <ListItem button onClick={toggleMediaOption('isWithImages')}>
              <ListItemText primary="Images" />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  color="primary"
                  checked={isWithImages}
                  onClick={toggleMediaOption('isWithImages')}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button onClick={toggleMediaOption('isWithVideos')}>
              <ListItemText primary="Videos" />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  color="primary"
                  checked={isWithVideos}
                  onClick={toggleMediaOption('isWithVideos')}
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
