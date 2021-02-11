import styled from 'styled-components';
import { Select } from '@material-ui/core';

export const SelectInline: typeof Select = styled(Select)`
  & .MuiSelect-select.MuiSelect-select {
    padding-right: 1px;
  }

  & .MuiSvgIcon-root {
    display: none;
  }
`;
