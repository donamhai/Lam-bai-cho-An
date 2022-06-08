import React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Dashboard, Link, PeopleAlt } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    color: "inherit",
    textDecoration: "none",

    "&.active > div": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/admin/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/todolist" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Todolist" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/blockchain" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Link />
            </ListItemIcon>
            <ListItemText primary="BlockChain" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}

export default Sidebar;
