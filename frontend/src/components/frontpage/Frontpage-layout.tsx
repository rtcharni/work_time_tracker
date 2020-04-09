import React from "react";
import {
  Container,
  CssBaseline,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
  IconButton,
  ListSubheader,
} from "@material-ui/core";

import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { useHistory } from "react-router-dom";

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

const FrontpageLayout = () => {
  const classes = useStyles();
  const routerHistory = useHistory();

  const redirectToActionUrl = (actionUrl: string) => {
    routerHistory.push(actionUrl);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={2}>
            {tileData.map((tile) => (
              <GridListTile key={tile.img} cols={tile.cols | 1}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.actionText}
                  // subtitle={<span>by: LOL</span>}
                  actionIcon={
                    <IconButton
                      onClick={() => redirectToActionUrl(tile.actionUrl)}
                      // className={classes.icon}
                    >
                      <AddCircleOutlineRoundedIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Container>
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

export default FrontpageLayout;
