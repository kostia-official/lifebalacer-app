import React from 'react';
import _ from 'lodash';
import MaterialTable, { MaterialTableProps } from 'material-table';
import { Fragment } from 'react';

export const Table = <T extends object>(props: MaterialTableProps<T>) => {
  if (_.isEmpty(props.data)) return <Fragment />;

  const tableData = _.map(props.data, (item: T) => ({ ...item }));

  return (
    <MaterialTable
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
