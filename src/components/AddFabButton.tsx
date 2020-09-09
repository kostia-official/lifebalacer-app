import React from "react";
import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() => ({
  button: {
    position: "fixed",
    bottom: "16px",
    right: "16px",
  },
}));

export interface ISaveFabButtonProps {
  onClick: (event: React.MouseEvent) => void;
}

export const AddFabButton: React.FC<ISaveFabButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Fab className={classes.button} color="primary" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};
