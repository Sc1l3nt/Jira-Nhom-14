import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Slider } from "antd";
import {
  CheckCircleFilled,
  WarningFilled,
  PlusSquareFilled,
  CaretUpOutlined,
  UpOutlined,
  MinusOutlined,
  DownOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import "../../../assets/scss/CreateIssue/CreateForm.scss";
import TinyTextArea from "../../TinyTextArea/TinyTextArea";
import { history } from "../../../index";
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
      formik.setTouched({
        taskName: true,
        description: true,
      });

      if (!formik.isValid) return;

      let data = { ...values, timeTrackingRemaining: timeTrackingRemaining };
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
      <Form layout="vertical" requiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="Project Name" label="Project Name">
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
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="Task Name" label="Task Name">
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
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="Status" label="Status">
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
                    <option key={i} value={item.statusId}>
                      {item.statusName}
                    </option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="typeId"
              onChange={(value) => {
                formik.setFieldValue("typeId", value);
              }}
              value={formik.values.typeId}
              label="Issue Type"
              rules={[{ required: true, message: "Please enter user type" }]}
            >
              <Input.Group>
                <Select style={{ width: "30%" }}>
                  <Option value="2">
                    <div className="text-success">
                      <CheckCircleFilled className="icon fs-5" />
                      <span className="title ms-2">Task</span>
                    </div>
                  </Option>
                  <Option value="1">
                    <div className="text-danger">
                      <WarningFilled className="icon fs-5" />
                      <span className="title ms-2">Bug</span>
                    </div>
                  </Option>
                </Select>
              </Input.Group>
              <span className="text">
                Start typing to get a list of possible matches.
              </span>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: "Please enter priority" }]}
            >
              <Input.Group>
                <Select
                  name="priorityId"
                  defaultValue={formik.values.priorityId}
                  onChange={(value) => {
                    formik.setFieldValue("priorityId", value);
                  }}
                  size="large"
                  style={{ width: "100%" }}
                >
                  <Option value="1">
                    <div className="text-danger">
                      <CaretUpOutlined className="icon fs-5" />
                      <span className="title ms-2">Highest</span>
                    </div>
                  </Option>
                  <Option value="2">
                    <div className="text-warning">
                      <UpOutlined className="icon fs-5" />
                      <span className="title ms-2">High</span>
                    </div>
                  </Option>
                  <Option value="3">
                    <div className="text-secondary">
                      <MinusOutlined className="icon fs-5" />
                      <span className="title ms-2">Medium</span>
                    </div>
                  </Option>
                  <Option value={priority[3]?.projectId}>
                    <div className="text-success">
                      <DownOutlined className="icon fs-5" />
                      <span className="title ms-2">Low</span>
                    </div>
                  </Option>
                  <Option value="4">
                    <div className="text-primary">
                      <CaretDownOutlined className="icon fs-5" />
                      <span className="title ms-2">Lowest</span>
                    </div>
                  </Option>
                </Select>
              </Input.Group>
              <span className="text">
                Priority in relation to other issues.
              </span>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter url description",
                },
              ]}
            >
              <TinyTextArea
                name="description"
                value={""}
                setFieldValue={(name, value) => {
                  console.log(name, value);
                }}
              />
              <span className="text">
                Describe the issue in as much detail as you'd like.
              </span>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div className="w-100 mt-3">
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
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <div className="w-full mt-3">
              <p>Time Tracking</p>
              <div className="w-100 d-flex justify-content-between ">
                <div className="w-50 mt-3 p-2">
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
                <div className="w-50 mt-3 p-2">
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

                      formik.setFieldValue(
                        "timeTrackingSpent",
                        +e.target.value
                      );
                      setSliderMode(true);
                    }}
                  />
                </div>
              </div>

              {/*  Slider bar area*/}
              <div className="w-100">
                <Slider
                  value={sliderMode ? timeTracking.timeTrackingSpent : 0}
                  max={
                    Number(timeTrackingRemaining) +
                    Number(timeTracking.timeTrackingSpent)
                  }
                  className="mt-5"
                />

                <div className="d-flex justify-content-between">
                  <div className="text-left font-bold">
                    {sliderMode ? timeTracking?.timeTrackingSpent : 0} hour(s)
                    spent
                  </div>
                  <div className="text-left font-bold">
                    {sliderMode ? timeTrackingRemaining : 0} hour(s) remaining
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
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
                <p className="text-danger">{formik.errors.description}</p>
              )}
            </div>
          </Col>
        </Row>
        <Button htmlType="submit" className="bg-primary text-white mt-3">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateForm;
