import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { Box } from "@material-ui/core";
import { updateTask } from "../../Todolist/todoSlice";
import { useDispatch } from "react-redux";
import { CheckBox } from "@material-ui/icons";

TodayList.propTypes = {
  dataToday: PropTypes.array,
};

function TodayList({ dataToday }) {
  const dispatch = useDispatch();

  const columns = [
    { title: "Title", field: "title", align: "center" },
    { title: "Description", field: "description", align: "center" },
    { title: "Estimate Hours", field: "estimateHours", align: "center" },
  ];
  return (
    <Box>
      <MaterialTable
        data={dataToday}
        columns={columns}
        title="Công việc cần làm trong hôm nay"
        actions={[
          {
            icon: () => <button>Hoàn thành</button>,
            onClick: (e, data) => {
              data = {
                ...data,
                status: data.status === false ? true : false,
              };
              const action = updateTask(data);
              dispatch(action);
            },
          },
        ]}
        options={{
          searchAutoFocus: false,
          search: false,
          searchFieldVariant: "outlined",
          pageSizeOptions: [10, 20, 30],
          pageSize: 10,
          actionsColumnIndex: -1,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          headerStyle: {
            background: "pink",
            fontStyle: "italic",
            color: "Highlight",
          },
          rowStyle: (data, index) =>
            data.status === true ? { textDecoration: "line-through" } : null,
        }}
      />
    </Box>
  );
}

export default TodayList;
