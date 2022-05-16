import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowarp",
    justifyContent: "space-between",
    alignItems: "center",

    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export function StatisticItem({ icon, label, value }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="caption">{label}</Typography>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
