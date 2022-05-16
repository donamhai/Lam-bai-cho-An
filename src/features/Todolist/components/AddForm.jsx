import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../components/form-controls/inputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import NumberField from "../../../components/form-controls/NumberField";
import DatePickerField from "../../../components/form-controls/DatePickerField";
import { date } from "yup/lib/locale";

AddEditForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  isAddMode: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function AddEditForm(props) {
  const classes = useStyles();

  // validate form by yup
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Hãy điền tiêu đề")
      .max(10000, "Hãy điền ít hơn 10000 ký tự."),
    description: yup
      .string()
      .required("Hãy điền mô tả chi tiết")
      .max(10000, "Hãy điền ít hơn 10000 ký tự."),
    estimateHours: yup
      .number()
      .min(0.1)
      .required("Hãy điền thời gian dự kiến lớn hơn 0.1 tiếng"),
    Date: yup.date().default(() => new Date()),
  });
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      estimateHours: 0,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="title" label="Tiêu đề" form={form} />
        <InputField name="description" label="Mô tả chi tiết" form={form} />
        <NumberField
          name="estimateHours"
          label="Dự kiến làm mất bao nhiều tiếng"
          form={form}
        />
        <DatePickerField name="Date" label="Ngày" form={form} />
        <Button
          disabled={isSubmitting}
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          size="large"
        >
          Tạo công việc mới
        </Button>
      </form>
    </div>
  );
}

export default AddEditForm;
