import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  makeStyles,
  createStyles,
  ListSubheader,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
// @ts-ignore
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { tutorials } from "../../tutorials";
// import { prodDependencies } from "mathjs";

interface SideBarProps {
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
  open?: boolean;
  handleClick?: () => void;
}

const drawerWidth = 240;

const useStyles = makeStyles(() =>
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
    chevronLeftIcon: {
      margin: "0 auto"
    },
  })
);

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { handleLoadTutorial, open, handleClick } = props;

  const classes = useStyles(props);
  const theme = useTheme();
  const lgBreakpointMatches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div>
      <Drawer
        variant={lgBreakpointMatches ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        className={`${classes.drawer} ${classes.drawerShow}`}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <IconButton onClick={handleClick} className={classes.chevronLeftIcon}>
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
                    <ListItemText>
                      Tutorial {i + 1}: {tutorial.description}
                    </ListItemText>
                  </ListItem>
                );
              }
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
