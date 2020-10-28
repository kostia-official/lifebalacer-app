import React, { useState, useEffect, useCallback, SyntheticEvent } from "react";
import { CardContent, CardActions, Button } from "@material-ui/core";
import { TextField } from "../TextField";
import styled from "styled-components";
import { EntryValueModalContentProps } from "./EntryValueModalContent";

const TextFieldStyled = styled(TextField)`
  width: 200px;
`;

const CardActionsStyled = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;

export const EntryNumberValueModalContent: React.FC<EntryValueModalContentProps> = ({
  onSave,
  onDelete,
  value: valueProp
}) => {
  const [value, setValue] = useState<string>('');

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      const resultValue = Number(value);

      if (!Number.isNaN(resultValue)) {
        onSave(resultValue);
      }

      e.preventDefault();
    },
    [value, onSave]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setValue(valueProp ? String(valueProp) : '');
  }, [valueProp]);

  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <TextFieldStyled
          required
          fullWidth
          autoFocus={true}
          label="Value"
          type="text"
          value={value}
          InputProps={{
            inputProps: {
              inputMode: 'numeric'
            }
          }}
          onChange={onChange}
        />
      </CardContent>
      <CardActionsStyled>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={onDelete}>Delete</Button>
      </CardActionsStyled>
    </form>
  );
};
