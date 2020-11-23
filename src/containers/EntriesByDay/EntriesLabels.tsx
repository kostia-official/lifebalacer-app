import React, { useMemo } from 'react';
import _ from 'lodash';
import { groupTodoistEntries } from '../../helpers/groupTodoistEntries';
import { EntryLabel } from '../../components/EntryLabel';
import { EntryResult, ActivityResult } from '../../common/types';
import styled from 'styled-components';

export interface EntriesLabelsProps {
  entries: EntryResult[];
  todoistActivity?: ActivityResult;
  getActivityById: (id: string) => ActivityResult | undefined;
}

const Wrapper = styled.span`
  display: inline-block;
  margin: 4px 0 0 0;
  font-size: 14px;
`;

const EntryLabelWrapper = styled.span`
  display: inline-block;
  margin: 2px 5px 2px 0;
`;

export const EntriesLabels: React.FC<EntriesLabelsProps> = ({
  entries,
  todoistActivity,
  getActivityById
}) => {
  const orderedEntries = useMemo(() => {
    return _.orderBy(entries, ['completedAt'], ['asc']);
  }, [entries]);

  const { entriesWithTodoistGroup } = useMemo(
    () =>
      groupTodoistEntries({
        entries: orderedEntries,
        todoistActivityId: todoistActivity?._id
      }),
    [orderedEntries, todoistActivity?._id]
  );

  return (
    <Wrapper>
      {entriesWithTodoistGroup.map((entry, index, array) => (
        <EntryLabelWrapper key={entry._id}>
          <EntryLabel
            entry={entry}
            activity={getActivityById(entry.activityId)}
            isAddComa={index !== array.length - 1}
          />
        </EntryLabelWrapper>
      ))}
    </Wrapper>
  );
};
