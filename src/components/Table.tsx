import React, { useMemo } from 'react';
import _ from 'lodash';
import MaterialTable, { MaterialTableProps } from 'material-table';
import { Fragment } from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export const Table = <T extends object>(props: MaterialTableProps<T>) => {
  const tableData = useMemo(() => _.map(props.data, (item: T) => ({ ...item })), [props.data]);

  if (_.isEmpty(props.data)) return <Fragment />;

  return (
    <MaterialTable
      icons={{
        // @ts-ignore
        SortArrow: ArrowDownwardIcon
      }}
      options={{
        paging: false,
        search: false,
        actionsColumnIndex: -1
      }}
      localization={{
        header: {
          actions: ''
        }
      }}
      {...props}
      data={tableData}
    />
  );
};
