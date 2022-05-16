import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ChatBubble, ChatRounded, PeopleAlt } from "@material-ui/icons";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "../Todolist/components/TodoList";
import { getAllTask } from "../Todolist/todoSlice";
import { StatisticItem } from "./component/statisticItem";
import TodayList from "./component/TodayList";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },

  text: {
    fontSize: "40px",
    fontWeight: "bold",
  },
}));

export function Dashboard() {
  const data = useSelector((state) => state.todos);
  const classes = useStyles();
  console.log(data);
  const dataToday = data
    .map((x) => {
      return Object.assign({}, x);
    })
    .filter(
      (x) =>
        new Date(x.Date).toLocaleDateString("en-GB") ===
        new Date().toLocaleDateString("en-GB")
    );

  return (
    <Box className={classes.root}>
      {/* statistic sextion */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="Tổng số công việc"
            value={data.length}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="Công việc đã hoàn thành"
            value={data.filter((x) => x.status === true).length}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="Công việc chưa hoàn thành"
            value={data.filter((x) => x.status === false).length}
          />
        </Grid>
      </Grid>
      <Box mt={10}>
        {dataToday.length !== 0 ? (
          <TodayList dataToday={dataToday} />
        ) : (
          <Typography className={classes.text}>
            Không có công việc nào hôm nay cần thực hiện
          </Typography>
        )}
      </Box>
    </Box>
  );
}
