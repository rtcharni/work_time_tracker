import React, { useState } from "react";
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { useHistory } from "react-router-dom";
import { Utils } from "src/utils/utils";

const tileData: any[] = [
  {
    img: `https://img.favpng.com/13/19/9/time-icon-png-favpng-rhQrgcFrGpBniUBzTXqGxttHd.jpg`,
    title: "Image",
    cols: 1,
    actionText: "New Time Entry",
    actionUrl: "/addworkentry",
  },
  {
    img: `https://cdn.pixabay.com/photo/2017/02/16/16/01/hours-2071706_960_720.png`,
    title: "Image",
    cols: 1,
    actionText: "New Work Entry",
    actionUrl: "/addworkentry",
  },
];

const Loginpage = () => {
  const classes = useStyles();
  const routerHistory = useHistory();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handles form input field change
   * @param event change event
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    switch (event.target.name) {
      case "userId":
        setUserId(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };

  /**
   * Handles on login button click
   */
  const handleLoginClick = () => {
    console.log(userId, password);
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <div
        // className="container"
        style={{
          backgroundColor: Utils.colors.pink,
          width: "100vw",
          height: "100vh",
          display: "flex",
          //   justifyContent: "center",
          //   alignContent: "center",
          flexDirection: "column",
        }}
      >
        <h2 style={{ alignSelf: "center", color: Utils.colors.blue }}>
          Welcome !
        </h2>

        {/* User ID */}
        <div style={{ alignSelf: "center" }}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                required
                name="userId"
                label="User ID"
                value={userId}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </div>

        {/* Password */}
        <div style={{ alignSelf: "center" }}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </div>

        {/* Login button */}
        <Button
          variant="contained"
          size="large"
          style={{
            color: Utils.colors.pink,
            backgroundColor: Utils.colors.blue,
            marginTop: 15,
          }}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export default Loginpage;
