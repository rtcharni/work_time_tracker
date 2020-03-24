import React, { useState, Props, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container } from "@material-ui/core";

const AddWorkEntryForm = (props: Props<any>) => {
  const [state, setState] = React.useState({
    workTitle: "Work title",
    workDetails: "Work details"
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target);
    switch (event.target.name) {
      case "workTitle":
        setState({ ...state, workTitle: event.target.value });
        break;
      case "workDetails":
        setState({ ...state, workDetails: event.target.value });
        break;
    }
    // console.log(state);
  };

  useEffect(() => {
    console.log(state);
  });

  return (
    <React.Fragment>
      <Container>
        <h4>Add new work entry</h4>

        <TextField
          name="workTitle"
          label="Title"
          value={state.workTitle}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          name="workDetails"
          label="Details"
          value={state.workDetails}
          onChange={handleInputChange}
          variant="outlined"
        />
      </Container>
    </React.Fragment>
  );
};

export default AddWorkEntryForm;
