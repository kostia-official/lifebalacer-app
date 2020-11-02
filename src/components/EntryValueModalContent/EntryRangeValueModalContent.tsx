import React, { useState, useEffect, useCallback, SyntheticEvent, ChangeEvent, useMemo } from "react";
import { CardContent, CardActions, Button, Slider } from "@material-ui/core";
import styled from "styled-components";
import { EntryValueModalContentProps } from "./EntryValueModalContent";
import _ from "lodash";

const CardActionsStyled = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;

const SliderStyled = styled(Slider)`
  min-width: 200px;
`;

export const EntryRangeValueModalContent: React.FC<EntryValueModalContentProps> = ({
  onSave,
  onDelete,
  activity,
  value: valueProp
}) => {
  const min = activity.rangeMeta?.from!;
  const max = activity.rangeMeta?.to!;
  const averageValue = Math.ceil((max + min) / 2);

  const [value, setValue] = useState<number>(valueProp || averageValue);

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

  const onRangeChange = useCallback((event: ChangeEvent<{}>, value: number | number[]) => {
    setValue(Array.isArray(value) ? value[0] : value);
  }, []);

  useEffect(() => {
    if (valueProp) setValue(valueProp);
  }, [valueProp]);

  const marks = useMemo(() => {
    return _.range(min, max + 1).map((n) => {
      return {
        value: n,
        label: n
      };
    });
  }, [min, max]);

  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <SliderStyled
          value={value}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          onChange={onRangeChange}
          min={min}
          max={max}
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
