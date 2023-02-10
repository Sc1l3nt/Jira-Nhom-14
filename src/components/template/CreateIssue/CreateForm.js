import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createTaskFormApi,
  getAllTaskTypesApi,
} from "../../../redux/reducers/taskReducer";
import { ACCESS_TOKEN } from "../../../constants";
import {
  getAllProjectApi,
  getUsersByProjectIdApi,
} from "../../../redux/reducers/projectReducer";
import { getAllPriorityApi } from "../../../redux/reducers/priorityReducer";
import { getAllStatusTypesApi } from "../../../redux/reducers/statusReducer";
import TinyMCEEditor from "../../TinyMCEEditor/TinyMCEEditor";

const { Option } = Select;

const CreateForm = () => {
  const dispatch = useDispatch();
  const [sliderMode, setSliderMode] = useState(true);
  const [timeTracking, setTimeTracking] = useState({
    totalEstimatedHours: 0,
    timeTrackingSpent: 0,
  });

  let timeTrackingRemaining =
    timeTracking.totalEstimatedHours - timeTracking.timeTrackingSpent;
  const { projectList, projectMembers } = useSelector(
    (state) => state.projectReducer
  );
  const { taskTypes } = useSelector((state) => state.taskReducer);
  const { priority } = useSelector((state) => state.priorityReducer);
  const { statusTypes } = useSelector((state) => state.statusReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: statusTypes[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      projectId: projectList[0]?.id,
      typeId: taskTypes[0]?.id,
      priorityId: priority[0]?.priorityId,
    },
    validationSchema: yup.object().shape({
      taskName: yup.string().required("Project name is required"),
      description: yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      //   formik.setTouched({
      //     taskName: true,
      //     description: true,
      //   });

      //   if (!formik.isValid) return;

      let data = { ...values, timeTrackingRemaining: timeTrackingRemaining };
      console.log("dataForm", data);
      dispatch(createTaskFormApi(data));

      formik.resetForm();

      formik.setTouched({
        taskName: false,
        description: false,
      });
    },
  });

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) dispatch(getAllProjectApi());
    dispatch(getAllTaskTypesApi());
    dispatch(getAllPriorityApi());
    dispatch(getAllStatusTypesApi());
    //dispatch(createAction(actionType.SET_SUBMIT_FUNCTION, formik.handleSubmit));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsersByProjectIdApi(projectList[0]?.id));
  }, [dispatch, projectList]);

  return (
    <div className="create">
      <Form
        layout="vertical"
        className="container"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full ">
          {/* tên project */}
          <p>Project </p>
          <Select
            name="projectId"
            value={formik.values.projectId}
            size="large"
            style={{ width: "100%" }}
            onChange={(value) => {
              dispatch(getUsersByProjectIdApi(value));
              formik.setFieldValue("projectId", value);
              formik.setFieldValue("listUserAsign", []);
            }}
          >
            {projectList.map((project, i) => {
              return (
                <option key={i} value={project.id}>
                  {project.projectName}
                </option>
              );
            })}
          </Select>
          <span className="italic font-medium text-sm mt-2 ">
            * You can only create tasks of your own projects!
          </span>
        </div>

        {/* tên task */}
        <div className="mt-3">
          <p>Task name</p>
          <Input
            placeholder="Task name"
            name="taskName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taskName}
          />
          {formik.touched.taskName && (
            <p className="text-red-600"> {formik.errors.taskName}</p>
          )}
        </div>

        {/* status */}
        <div className="w-full mt-3">
          <p>Status </p>
          <Select
            name="statusId"
            value={formik.values.statusId}
            size="large"
            style={{ width: "100%" }}
            onChange={(value) => {
              formik.setFieldValue("statusId", value);
            }}
          >
            {statusTypes?.map((item, i) => {
              return (
                <Option key={i} value={item.statusId}>
                  {item.statusName}
                </Option>
              );
            })}
          </Select>
        </div>

        <div className="w-full flex justify-between ">
          {/* priority */}
          <div className="w-5/12 mt-3 ">
            <p>Priority </p>
            <Select
              name="priorityId"
              value={formik.values.priorityId}
              onChange={(value) => {
                formik.setFieldValue("priorityId", value);
              }}
              size="large"
              style={{ width: "100%" }}
            >
              {priority?.map((item, i) => {
                return (
                  <option key={i} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </Select>
          </div>

          {/* Task type */}
          <div className="w-5/12 mt-3">
            <p>Task Type</p>
            <Select
              name="typeId"
              onChange={(value) => {
                formik.setFieldValue("typeId", value);
              }}
              value={formik.values.typeId}
              size="large"
              style={{ width: "100%" }}
            >
              {taskTypes?.map((item, i) => {
                return (
                  <option key={i} value={item.id}>
                    {item.taskType}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>

        {/* Members */}
        <div className="w-full mt-3">
          <p>Assigners</p>
          <Select
            name="listUserAsign"
            value={formik.values.listUserAsign}
            mode="multiple"
            size="midle"
            options={
              projectMembers.length > 0 &&
              projectMembers.map((item, i) => {
                return { value: item.userId, label: item.name };
              })
            }
            optionFilterProp="label"
            onChange={(values) => {
              formik.setFieldValue("listUserAsign", values);
            }}
            style={{ width: "100%" }}
          ></Select>
        </div>

        {/* Time Tracking */}
        <div className="w-full mt-3">
          <p>Time Tracking</p>
          <div className="w-full flex justify-between ">
            <div className="w-5/12 mt-3 ">
              <p>Total Estimated Hours </p>
              <Input
                name="originalEstimate"
                type="number"
                min="0"
                value={formik.values.originalEstimate}
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    totalEstimatedHours: e.target.value,
                  });

                  formik.setFieldValue("originalEstimate", +e.target.value);
                }}
              />
            </div>
            <div className="w-5/12 mt-3 ">
              <p>Hours spent </p>
              <Input
                name="timeTrackingSpent"
                type="number"
                value={formik.values.timeTrackingSpent}
                min="0"
                max={timeTracking.totalEstimatedHours}
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: e.target.value,
                  });

                  formik.setFieldValue("timeTrackingSpent", +e.target.value);
                  setSliderMode(true);
                }}
              />
            </div>
          </div>

          {/*  Slider bar area*/}
          <div className="w-full">
            <Slider
              value={sliderMode ? timeTracking.timeTrackingSpent : 0}
              max={
                Number(timeTrackingRemaining) +
                Number(timeTracking.timeTrackingSpent)
              }
              className="mt-5"
            />

            <div className="flex justify-between">
              <div className="text-left  font-bold">
                {sliderMode ? timeTracking?.timeTrackingSpent : 0} hour(s) spent
              </div>
              <div className="text-left  font-bold">
                {sliderMode ? timeTrackingRemaining : 0} hour(s) remaining
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="mt-3">Description</p>
          <TinyMCEEditor
            name="description"
            value={formik.values.description}
            onEditorChange={(value) =>
              formik.setFieldValue("description", value)
            }
          />
          {formik.touched.description && (
            <p className="text-red-600">{formik.errors.description}</p>
          )}
        </div>
        <Button
          htmlType="submit"
          className="bg-primary text-white mt-3"
          onClick={formik.handleSubmit}
        >
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateForm;
