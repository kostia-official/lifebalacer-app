import React, { useMemo, Fragment } from 'react';
import _ from 'lodash';
import { groupTodoistEntries } from '../../helpers/groupTodoistEntries';
import { EntryLabel } from '../../components/EntryLabel/EntryLabel';
import { ActivityResult, DayResult } from '../../common/types';
import styled from 'styled-components';
import { MissingLabel } from './MissingLabel';
import { isLastIndex } from '../../helpers/array';

export interface EntriesLabelsProps {
  day: DayResult;
  todoistActivity?: ActivityResult;
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
  todoistActivity
}) => {
  const { entriesWithTodoistGroup } = useMemo(
    () =>
      groupTodoistEntries({
        entries: entries,
        todoistActivityId: todoistActivity?._id
      }),
    [entries, todoistActivity?._id]
  );

  return (
    <Wrapper>
      {entriesWithTodoistGroup.map((entry, index, array) => {
        return (
          <EntryLabelWrapper key={entry._id}>
            <EntryLabel
              entry={entry}
              activity={entry.activity}
              isAddComa={!isLastIndex(array, index)}
            />
          </EntryLabelWrapper>
        );
      })}

      {!_.isEmpty(missing) && (
        <Fragment>
          <MissingLabel date={date} />
          {missing.map(({ activityId, activity }, index) => {
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
