import React from "react";
import {makeStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';

const useButtonImportStyles = makeStyles((theme) =>
  createStyles({
    input: {
      display: 'none',
    },
  })
);
const ButtonImport = (props) => {
  const classes = useButtonImportStyles();
  return (
    <label htmlFor={`upload-button-${props.name}`}>
    <input
      accept="image/*"
      className={classes.input}
      id={`upload-button-${props.name}`}
      name={props.name}
      multiple
      type="file"
      onChange={props.onChange}
    />
    <Button variant="contained" component="span" {...props}>
      {props.children}
    </Button>
  </label>
  );
};

export default ButtonImport;
