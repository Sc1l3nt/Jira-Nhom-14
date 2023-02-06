import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectAuthorizeApi,
  getAllProjectCategoryApi,
  setProjectDetailNullAction,
} from "../../../redux/reducers/projectReducer";
import Swal from "sweetalert2";
import AddMemberModal from "../../../components/AddMemberModal/AddMemberModal";
import { Breadcrumb, Button, Form, Input, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import TinyMCEEditor from "../../../components/TinyMCEEditor/TinyMCEEditor";

const ProjectNew = () => {
  const dispatch = useDispatch();
  const { projectCategories, projectError, projectDetail } = useSelector(
    (state) => state.projectReducer
  );
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      categoryId: 0,
    },
    validationSchema: yup.object().shape({
      projectName: yup.string().required("Project name is required"),
      categoryId: yup
        .number()
        .required("Project category is required")
        .min(1, "Project category is required")
        .max(3, "Project category is required"),
    }),
  });

  useEffect(() => {
    dispatch(getAllProjectCategoryApi());
  }, [dispatch]);

  useEffect(() => {
    if (projectError === "Project name already exists") {
      formik.setErrors({
        projectName: projectError,
        ...formik.errors,
      });
    }
  }, [projectError]);

  const handleSubmit = async () => {
    try {
      await dispatch(createProjectAuthorizeApi(formik.values));
      Swal.fire(
        {
          title: "Project was created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        },
        () => {
          formik.resetForm();
          setShowAddMembersModal(true);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    dispatch(setProjectDetailNullAction(null));
    setShowAddMembersModal(false);
  };

  return (
    <div style={{ maxWidth: 980 }} className="mx-auto">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>New project</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        <Typography.Title level={3}>New project</Typography.Title>
      </div>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={
            <Typography.Text strong>
              Project name <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.projectName && formik.errors.projectName}
          validateStatus={
            formik.touched.projectName && !!formik.errors.projectName
              ? "error"
              : ""
          }
        >
          <Input
            name="projectName"
            value={formik.values.projectName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Project category <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.categoryId && formik.errors.categoryId}
          validateStatus={
            formik.touched.categoryId && !!formik.errors.categoryId
              ? "error"
              : ""
          }
        >
          <Select
            className="w-full"
            placeholder="Select a project category"
            name="categoryId"
            value={formik.values.categoryId}
            onChange={(value) => formik.setFieldValue("categoryId", value)}
          >
            <Select.Option value={0}>Select a project category</Select.Option>
            {projectCategories.map(({ id, projectCategoryName }) => {
              return (
                <Select.Option key={id} value={id}>
                  {projectCategoryName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label={<Typography.Text strong>Descriptions</Typography.Text>}
          style={{ minHeight: 230 }}
        >
          <TinyMCEEditor
            name="description"
            value={formik.values.description}
            onEditorChange={(newValue) => {
              newValue = newValue.replace(/<[^>]*>/g, "");
              formik.setFieldValue("description", newValue);
            }}
          />
        </Form.Item>

        <div className="flex">
          <Link
            to="/projects"
            className="flex justify-center items-center h-8 bg-gray-300 hover:bg-gray-400 focus:bg-blue-300 text-gray-700 hover:text-gray-700 focus:text-blue-700 border-0 mr-1 font-medium py-1.5 px-3 rounded"
          >
            Cancel
          </Link>

          <Button htmlType="submit">Create</Button>
        </div>
      </Form>

      {projectDetail && (
        <AddMemberModal
          visible={showAddMembersModal}
          onCancel={handleCancel}
          project={projectDetail}
        />
      )}
    </div>
  );
};

export default ProjectNew;
