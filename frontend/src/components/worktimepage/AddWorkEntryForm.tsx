import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Snackbar } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Config } from "../../../../models";
import MuiAlert from "@material-ui/lab/Alert";

type AppProps = { config: Config };
type AllFields = {
  title?: string;
  details?: string;
  customerName?: string;
};

const AddWorkEntryForm = ({ config }: AppProps) => {
  const [fields, setFields] = useState({} as AllFields);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect((): void => {
    if (config) {
      const formFields: any = {};
      for (const k of config.workFormFields) {
        formFields[k] = " ";
      }
      setFields(formFields);
    }
  }, []);

  /**
   * Handles form input field change
   * @param event change event
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    switch (event.target.name) {
      case "title":
        setFields({ ...fields, title: event.target.value });
        break;
      case "details":
        setFields({ ...fields, details: event.target.value });
        break;
      case "customerName":
        setFields({ ...fields, customerName: event.target.value });
        break;
    }
  };

  /**
   * Handles save button
   */
  const handleSaveButton = (): void => {
    if (validateFields()) {
      // form good make request to backend
      console.log("Form Good", fields);
    } else {
      console.log("Form Bad");
      setShowSnackbar(true);
    }
  };

  /**
   * Validates all fields
   */
  const validateFields = (): boolean => {
    for (const inputValue of Object.values(fields)) {
      if (!inputValue || !inputValue.trim()) {
        return false;
      }
    }
    return true;
  };

  return (
    <React.Fragment>
      <Snackbar
        onClose={() => setShowSnackbar(false)}
        open={showSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        message="Please correct fields :)"
      >
        {/* <MuiAlert variant="outlined" severity="error">
          Please correct fields :)
        </MuiAlert> */}
      </Snackbar>

      <div className="d-flex flex-column align-items-center">
        <h4>Add new work entry</h4>
        {fields.title !== undefined && (
          <div className="mb-3">
            <TextField
              required
              name="title"
              label="Title"
              variant="outlined"
              value={fields.title}
              onChange={handleInputChange}
              error={fields.title === "" ? true : false}
              helperText={fields.title === "" ? "Required field" : ""}
            />
          </div>
        )}
        {fields.customerName !== undefined && (
          <div className="mb-3">
            <TextField
              required
              name="customerName"
              label="Customer name"
              variant="outlined"
              value={fields.customerName}
              onChange={handleInputChange}
              error={fields.customerName === "" ? true : false}
              helperText={fields.customerName === "" ? "Required field" : ""}
            />
          </div>
        )}
        {fields.details !== undefined && (
          <div className="mb-3">
            <TextField
              multiline
              rows="3"
              required
              name="details"
              label="Details"
              variant="outlined"
              value={fields.details}
              onChange={handleInputChange}
              error={fields.details === "" ? true : false}
              helperText={fields.details === "" ? "Required field" : ""}
            />
          </div>
        )}

        <Button
          variant="outlined"
          color="default"
          startIcon={<AddRoundedIcon />}
          onClick={handleSaveButton}
        >
          Save
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AddWorkEntryForm;
