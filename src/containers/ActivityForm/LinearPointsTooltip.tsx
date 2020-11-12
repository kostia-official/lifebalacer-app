import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import _ from 'lodash';

export const LinearPointsTooltip = () => {
  return (
    <Fragment>
      <Typography color="inherit" variant="body2" component="p" gutterBottom>
        Earned points will be derived from value and calculated like points*value.
      </Typography>

      <Typography color="inherit" variant="body2" component="p" gutterBottom>
        For example, we track how much alcohol was drunk. We estimate the amount on the range from {' '}
        <b>1</b> to <b>5</b>. If we specify here points: <b>-100</b>, then earned points will be
        like this:
      </Typography>

      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {_.range(1, 6).map((n) => {
            return (
              <tr key={n}>
                <td>{n}</td>
                <td>{-100 * n}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};
