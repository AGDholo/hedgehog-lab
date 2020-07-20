import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
  ListSubheader,
  IconButton,
} from "@material-ui/core";
// @ts-ignore
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { tutorials } from "../../tutorials";

interface SideBarProps {
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
  open?: boolean;
  handleClick?: () => void;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    drawerShow: {
      display: (props: SideBarProps) => (props.open ? "block" : "none"),
    },
  })
);

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { handleLoadTutorial, open, handleClick } = props;
  const classes = useStyles(props);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      className={`${classes.drawer} ${classes.drawerShow}`}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <IconButton onClick={handleClick}>
        <ChevronLeftIcon />
      </IconButton>
      <div className={classes.drawerContainer}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Hedgehog Lab Tutorials:
            </ListSubheader>
          }
        >
          {tutorials.map(
            (tutorial: { description: React.ReactNode }, i: number) => {
              return (
                <ListItem
                  key={`${i}-${Date.now()}`}
                  button
                  onClick={(e) => handleLoadTutorial(e, i)}
                >
                  <ListItemText primary={`${i + 1}: ${tutorial.description}`}>
                    Tutorial {i + 1}: {tutorial.description}
                  </ListItemText>
                </ListItem>
              );
            }
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
