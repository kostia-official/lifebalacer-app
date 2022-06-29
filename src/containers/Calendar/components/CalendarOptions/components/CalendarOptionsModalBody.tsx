import React, { useCallback } from 'react';
import { makeModal } from '../../../../../hooks/makeModal';
import { ActivityFragment } from '../../../../../generated/apollo';
import {
  ModalTitle,
  ModalContent,
  ModalSubListContainer,
  ModalActions
} from '../../../../../components/Modal';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Switch
} from '@material-ui/core';
import { useCalendarOptions, CalendarHighlightOptionsData } from '../hooks/useCalendarOptions';
import { ActivitySelect } from '../../../../../components/ActivitySelect';

export interface CalendarFiltersModalBodyProps {
  allActivities: ActivityFragment[];
}

export const useCalendarFiltersModal = makeModal();

const highlightDaysItems: { optionKey: keyof CalendarHighlightOptionsData; label: string }[] = [
  { optionKey: 'isHighlightWithDescription', label: 'Show days with descriptions' },
  { optionKey: 'isHighlightWithImage', label: 'Show days with images' },
  { optionKey: 'isHighlightWithVideo', label: 'Show days with videos' }
];

export const CalendarOptionsModalBody: React.FC<CalendarFiltersModalBodyProps> = ({
  allActivities
}) => {
  const { closeModal } = useCalendarFiltersModal();

  const { selectedOptions, applyOptions, setSelectedOptions, clearOptions } = useCalendarOptions();

  const apply = useCallback(() => {
    applyOptions();
    closeModal();
  }, [applyOptions, closeModal]);

  const clearAll = useCallback(() => {
    clearOptions();
    closeModal();
  }, [clearOptions, closeModal]);

  const toggleHighlightOption = useCallback(
    (optionKey: keyof CalendarHighlightOptionsData) => () => {
      setSelectedOptions((prev) => ({ [optionKey]: !prev[optionKey] }));
    },
    [setSelectedOptions]
  );

  const setActivityId = (activityId: string | undefined) => {
    setSelectedOptions({ activityId });
  };

  return (
    <>
      <ModalTitle onClose={closeModal}>Options</ModalTitle>

      <ModalContent dividers>
        <List>
          <ListSubheader>Activity</ListSubheader>

          <ModalSubListContainer>
            <ListItem>
              <ActivitySelect
                value={selectedOptions.activityId}
                activities={allActivities}
                onSelect={setActivityId}
              />
            </ListItem>
          </ModalSubListContainer>
        </List>

        <List>
          <ListSubheader>Days highlight</ListSubheader>

          <ModalSubListContainer>
            {highlightDaysItems.map(({ label, optionKey }, i) => {
              const optionValue = selectedOptions[optionKey];

              return (
                <ListItem key={i} button onClick={toggleHighlightOption(optionKey)}>
                  <ListItemText primary={label} />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      color="primary"
                      checked={optionValue}
                      onChange={toggleHighlightOption(optionKey)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
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
