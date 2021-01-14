import React, { useMemo, Fragment } from 'react';
import _ from 'lodash';
import { groupTodoistEntries } from '../../helpers/groupTodoistEntries';
import { EntryLabel } from '../../components/EntryLabel';
import { ActivityResult, DayResult } from '../../common/types';
import styled from 'styled-components';
import { MissingLabel } from './MissingLabel';
import { isLastIndex } from '../../helpers/array';

export interface EntriesLabelsProps {
  day: DayResult;
  todoistActivity?: ActivityResult;
  getActivityById: (id: string) => ActivityResult | undefined;
}

const Wrapper = styled.span`
  display: inline-block;
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const EntryLabelWrapper = styled.span`
  display: inline-block;
`;

export const EntriesLabels: React.FC<EntriesLabelsProps> = ({
  day: { entries, missing, date },
  todoistActivity,
  getActivityById
}) => {
  const activeEntries: typeof entries = useMemo(
    () =>
      entries.filter((entry) => {
        const activity = getActivityById(entry.activityId);

        return !activity?.isArchived;
      }),
    [entries, getActivityById]
  );

  const { entriesWithTodoistGroup } = useMemo(
    () =>
      groupTodoistEntries({
        entries: activeEntries,
        todoistActivityId: todoistActivity?._id
      }),
    [activeEntries, todoistActivity?._id]
  );

  return (
    <Wrapper>
      {entriesWithTodoistGroup.map((entry, index, array) => {
        const activity = getActivityById(entry.activityId);

        return (
          <EntryLabelWrapper key={entry._id}>
            <EntryLabel entry={entry} activity={activity} isAddComa={!isLastIndex(array, index)} />
          </EntryLabelWrapper>
        );
      })}

      {!_.isEmpty(missing) && (
        <Fragment>
          <MissingLabel date={date} />
          {missing.map(({ activityId }, index) => {
            const activity = getActivityById(activityId);

            return (
              <EntryLabelWrapper key={activityId}>
                <EntryLabel activity={activity} isAddComa={!isLastIndex(missing, index)} />
              </EntryLabelWrapper>
            );
          })}
        </Fragment>
      )}
    </Wrapper>
  );
};
