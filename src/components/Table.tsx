import React from 'react';
import _ from 'lodash';
import MaterialTable, { MaterialTableProps } from 'material-table';

export const Table = <T extends object>(props: MaterialTableProps<T>) => {
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
