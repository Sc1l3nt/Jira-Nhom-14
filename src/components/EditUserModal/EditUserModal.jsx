import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { changeInfoApi, getAllUserApi } from "../../redux/reducers/userReducer";
import Swal from "sweetalert2";
import { Button, Form, Input, Modal, Typography } from "antd";

const EditUserModal = ({ visible, onCancel, user }) => {
  const { userId: id, email, name, phoneNumber } = user;
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      email,
      name,
      phoneNumber,
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: {
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      name: yup.string().required("Name is required"),
      phoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Phone number must contain numbers only"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
      passwordConfirmation: yup
        .string()
        .required("Password confirmation is required")
        .oneOf([yup.ref("password")], "Password confirmation does not match"),
    },
  });

  const handleSubmit = async () => {
    await dispatch(changeInfoApi(formik.values));
    await dispatch(getAllUserApi());
    Swal.fire({
      title: "User updated successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
    formik.resetForm();
    onCancel();
  };

  const handleCancel = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal
      title={<Typography.Title level={5}>Edit User</Typography.Title>}
      open={visible}
      onCancel={onCancel}
      //   maskClosable={false}
      //   wrapClassName="z-modal"
      className="z-modal"
      footer={null}
      centered
      destroyOnClose={true}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={
            <Typography.Text strong>
              Id <span className="text-red-700">*</span>
            </Typography.Text>
          }
        >
          <Input name="id" value={formik.values.id} disabled />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Email <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.email && formik.errors.email}
          validateStatus={
            formik.touched.email && !!formik.errors.email ? "error" : ""
          }
        >
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Name <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.name && formik.errors.name}
          validateStatus={
            formik.touched.name && !!formik.errors.name ? "error" : ""
          }
        >
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={<Typography.Text strong>Phone number</Typography.Text>}
          help={formik.touched.phoneNumber && formik.errors.phoneNumber}
          validateStatus={
            formik.touched.phoneNumber && !!formik.errors.phoneNumber
              ? "error"
              : ""
          }
        >
          <Input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Password <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.password && formik.errors.password}
          validateStatus={
            formik.touched.password && !!formik.errors.password ? "error" : ""
          }
        >
          <Input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Password confirmation <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
          validateStatus={
            formik.touched.passwordConfirmation &&
            !!formik.errors.passwordConfirmation
              ? "error"
              : ""
          }
        >
          <Input
            type="password"
            name="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item className="mb-0 text-right">
          <Button
            htmlType="submit"
            className="bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded mr-1"
            type="primary"
          >
            Update
          </Button>
          <Button
            className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
