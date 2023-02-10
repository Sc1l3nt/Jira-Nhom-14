import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getAllProjectCategoryApi,
  getProjectDetailApi,
  updateProjectApi,
} from "../../../redux/reducers/projectReducer";
import PageNotFound from "../../PageNotFound/PageNotFound";
import Swal from "sweetalert2";
import { Breadcrumb, Button, Form, Input, Select, Typography } from "antd";
import TinyMCEEditor from "../../../components/TinyMCEEditor/TinyMCEEditor";

const ProjectEdit = () => {
  const params = useParams();
  const projectId = parseInt(params.id);
  const dispatch = useDispatch();
  const { projectDetail, projectCategories, projectError } = useSelector(
    (state) => state.projectReducer
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      id: 0,
      creator: 0,
      categoryId: "",
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
    dispatch(getProjectDetailApi(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    formik.setValues({
      ...projectDetail,
      creator: projectDetail?.creator.id,
      categoryId: projectDetail?.projectCategory.id,
    });
    // eslint-disable-next-line
  }, [projectDetail]);

  const handleUpdateProject = () => {
    // formik.setTouched({
    //   projectName: true,
    //   categoryId: true,
    // });

    // if (!formik.dirty) return;

    // if (!formik.isValid) return;

    dispatch(updateProjectApi(formik.values));
    dispatch(getProjectDetailApi(projectId));
    Swal.fire({
      title: "Project updated successfully",
      icon: "success",
      confirmButtonText: "OK",
    });

    // dispatch(
    //   updateProject(formik.values, () => {
    //     dispatch(fetchProjectDetail(projectId));
    //     Swal.fire({
    //       title: "Project updated successfully",
    //       icon: "success",
    //       showConfirmButton: false,
    //     });
    //   })
    // );
  };

  // check if the project no longers exist
  if (projectError && projectError === "Project is not found") {
    return <PageNotFound />;
  }

  return (
    <div style={{ maxWidth: 980 }} className="container my-3">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/projects/${projectId}/board`}>
            {projectDetail?.projectName}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Project settings</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        <Typography.Title level={3}>Update project</Typography.Title>
      </div>

      <Form layout="vertical" onFinish={handleUpdateProject}>
        <Form.Item
          label={
            <Typography.Text strong>
              Project ID <span className="text-red-700">*</span>
            </Typography.Text>
          }
        >
          <Input disabled value={formik.values?.id} />
        </Form.Item>
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
            value={formik.values?.projectName}
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
            value={formik.values?.categoryId}
            onChange={(value) => formik.setFieldValue("categoryId", value)}
          >
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
          label={<Typography.Text strong>Description</Typography.Text>}
          style={{ minHeight: 230 }}
        >
          <TinyMCEEditor
            name="description"
            value={formik.values?.description}
            onEditorChange={(value) =>
              formik.setFieldValue("description", value)
            }
          />
        </Form.Item>

        <div className="d-flex align-items-center">
          <Button className="me-3">
            <Link to="/projects">Cancel</Link>
          </Button>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProjectEdit;
