import React, { useCallback, useMemo } from 'react';
import { makeModal } from '../../../../../hooks/useModal';
import { DurationType, ActivityFragment } from '../../../../../generated/apollo';
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
  Switch,
  MenuItem,
  Select
} from '@material-ui/core';
import { Greyscale } from '../../../../../components/Greyscale';
import { useCalendarOptions, CalendarHighlightOptionsData } from '../hooks/useCalendarOptions';

export interface CalendarFiltersModalBodyProps {
  allActivities: ActivityFragment[];
}

export const useCalendarFiltersModal = makeModal();

const highlightDaysItems: { optionKey: keyof CalendarHighlightOptionsData; label: string }[] = [
  { optionKey: 'isHighlightWithDescription', label: 'Show days with descriptions' },
  { optionKey: 'isHighlightWithImage', label: 'Show days with images' },
  { optionKey: 'isHighlightWithVideo', label: 'Show days with videos' }
];

interface ActivityItem {
  label: string;
  isArchived?: boolean;
  activityId?: string;
}

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

  const setActivityId = useCallback(
    (activityId: string | undefined) => () => {
      setSelectedOptions({ activityId });
    },
    [setSelectedOptions]
  );

  const activitiesItems: ActivityItem[] = useMemo(() => {
    return [
      { label: 'All' },
      ...allActivities.map(({ _id, emoji, name, isArchived }) => ({
        isArchived,
        activityId: _id,
        label: `${emoji} ${name}`
      }))
    ];
  }, [allActivities]);

  return (
    <>
      <ModalTitle onClose={closeModal}>Options</ModalTitle>

      <ModalContent dividers>
        <List>
          <ListSubheader>Activity</ListSubheader>

          <ModalSubListContainer>
            <ListItem>
              <Select value={selectedOptions.activityId} displayEmpty fullWidth variant="outlined">
                {activitiesItems?.map(({ activityId, label, isArchived }, i) => (
                  <MenuItem key={i} value={activityId} onClick={setActivityId(activityId)}>
                    <Greyscale isEnable={isArchived}>{label}</Greyscale>
                  </MenuItem>
                ))}
              </Select>
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
                      value={DurationType.Week}
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
