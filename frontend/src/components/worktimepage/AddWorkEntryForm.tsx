import React, { useState, Props, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Config } from "../../../../models";

type AppProps = { config: Config };
type AllFields = {
  workTitle?: string;
  workDetails?: string;
  customerName?: string;
};

const AddWorkEntryForm = ({ config }: AppProps) => {
  // const [state, setState] = useState({
  //   workTitle: "Work title",
  //   workDetails: "Work details",
  //   customerName: "Customer name"
  // });
  const [fields, setFields] = useState({} as AllFields);

  useEffect((): void => {
    // console.log(config);
    if (config) {
      let formFields: any = {};
      for (const k of config.workFormFields) {
        formFields[k] = "";
      }
      console.log("setting");
      setFields(formFields);
    }
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    switch (event.target.name) {
      case "workTitle":
        setFields({ ...fields, workTitle: event.target.value });
        break;
      case "workDetails":
        setFields({ ...fields, workDetails: event.target.value });
        break;
      case "customerName":
        setFields({ ...fields, customerName: event.target.value });
        break;
    }
  };

  const handleSaveButton = (): void => {
    if (validateForm()) {
      // form good make request to backend
      console.log("Form Good");
    } else {
      console.log("Form Bad");
    }
  };

  const validateForm = (): boolean => {
    for (const inputValue of Object.values(fields)) {
      if (!inputValue) {
        return false;
      }
    }
    return true;
  };

  return (
    <React.Fragment>
      <Container>
        <h4>Add new work entry</h4>
        {fields.workTitle !== undefined && (
          <div className="row">
            <TextField
              required
              name="workTitle"
              label="Title"
              variant="outlined"
              value={fields.workTitle}
              onChange={handleInputChange}
              error={fields.workTitle === "" ? true : false}
              helperText={fields.workTitle === "" ? "Required field" : ""}
            />
          </div>
        )}
        {fields.workDetails !== undefined && (
          <div className="row">
            <TextField
              required
              name="workDetails"
              label="Details"
              variant="outlined"
              value={fields.workDetails}
              onChange={handleInputChange}
              error={fields.workDetails === "" ? true : false}
              helperText={fields.workDetails === "" ? "Required field" : ""}
            />
          </div>
        )}

        {fields.customerName !== undefined && (
          <div className="row">
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

        <Button
          variant="outlined"
          color="default"
          startIcon={<AddRoundedIcon />}
          onClick={handleSaveButton}
        >
          Save
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default AddWorkEntryForm;
