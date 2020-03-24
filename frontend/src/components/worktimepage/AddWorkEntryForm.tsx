import React, { useState, Props } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddWorkEntryForm = (props: Props<any>) => {
  const [open, setOpen] = useState(true);

  return (
    <React.Fragment>
      <div>Form works!</div>
    </React.Fragment>
  );
};

export default AddWorkEntryForm;
