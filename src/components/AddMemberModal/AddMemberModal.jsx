import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Row,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { history } from "../../index";
import {
  assignUserToProjectApi,
  removeUserFromProjectApi,
  setProjectErrorNullAction,
} from "../../redux/reducers/projectReducer";
import {
  getAllUserApi,
  getUserByProjectIdApi,
} from "../../redux/reducers/userReducer";

const AddMemberModal = (props) => {
  console.log(props.visible);
  const { showFooter = true } = props;
  const dispatch = useDispatch();
  const { projectMembers, projectError } = useSelector(
    (state) => state.projectReducer
  );
  const { userList, userProfile } = useSelector((state) => state.userReducer);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersRef = useRef(null);
  const searchRef = useRef(null);

  console.log(userList);
  console.log(userProfile);

  useEffect(() => {
    dispatch(getUserByProjectIdApi(props.project.id));
    dispatch(getAllUserApi());
  }, [dispatch, props.project.id]);

  useEffect(() => {
    const clonedUsers = [...userList];

    // remove members from user list
    for (const member of projectMembers) {
      const index = clonedUsers.findIndex((item) => {
        return item.userId === member.userId;
      });

      clonedUsers.splice(index, 1);
    }

    usersRef.current = [...clonedUsers];

    if (!searchRef.current) {
      setFilteredUsers([...clonedUsers]);
    } else {
      handleSearchUsers();
    }
  }, [projectMembers, userList]);

  useEffect(() => {
    if (projectError === "User is unthorization!") {
      Modal.warning({
        title: projectError,
        content: "You are not the owner of this project",
        okText: "OK",
        okButtonProps: {
          className:
            "bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded",
        },
        zIndex: 1050,
        style: { top: 80 },
        maskClosable: true,
        afterClose: () => {
          dispatch(dispatch(setProjectErrorNullAction(null)));
        },
      });
    }
  }, [projectError, dispatch]);

  const addMemberToProject = async (userId) => {
    const data = { projectId: props.project.id, userId };
    await dispatch(assignUserToProjectApi(data));
    await dispatch(getUserByProjectIdApi(props.project.id));
    Swal.fire({
      title: "Add member successfully",
      icon: "success",
      cancelButtonText: "OK",
    });
    if (props.onFetchProject) {
      props.onFetchProject();
    }
  };

  const removeMemberFromProject = async (userId) => {
    const data = { projectId: props.project.id, userId };
    await dispatch(removeUserFromProjectApi(data));
    await dispatch(getUserByProjectIdApi(props.project.id));
    Swal.fire({
      title: "Remove member successfully",
      icon: "success",
      cancelButtonText: "OK",
    });
    if (props.onFetchProject) {
      props.onFetchProject();
    }
  };

  const handleGoToProjectsButtonClick = () => {
    props.onCancel();
    history.push("/projects");
  };

  const handleSearchUsers = (e) => {
    const value = searchRef.current.input.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const clonedUsers = [...usersRef.current];

    let foundUsers = [];

    for (const i in clonedUsers) {
      if (
        clonedUsers[i].name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(value)
      ) {
        foundUsers.push(clonedUsers[i]);
      }
    }

    setFilteredUsers([...foundUsers]);
  };

  return (
    <>
      <Modal
        title={
          <Typography.Title level={4} className="pl-6">
            Add members to project{" "}
            <span className="text-blue-700">{props.project.projectName}</span>
          </Typography.Title>
        }
        open={props.visible}
        centered
        width={980}
        onCancel={props.onCancel}
        maskClosable={false}
        destroyOnClose={true}
        footer={
          showFooter
            ? [
                <Button
                  key="projects"
                  onClick={handleGoToProjectsButtonClick}
                  className="h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                >
                  Go to projects
                </Button>,
                <Button
                  key="newProject"
                  onClick={props.onCancel}
                  className="h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                >
                  Create new project
                </Button>,
              ]
            : null
        }
      >
        <Row gutter={36}>
          <Col span={24}>
            <Form>
              <Form.Item
                label={<Typography.Text strong>Search users</Typography.Text>}
                colon={false}
                className="pl-6 pr-6"
                labelCol={{ span: 6 }}
                labelAlign="left"
              >
                <Input
                  allowClear
                  suffix={<SearchOutlined />}
                  className="w-48 rounded"
                  onChange={handleSearchUsers}
                  ref={searchRef}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Typography.Title level={5} className="pl-6">
              Not yet added
            </Typography.Title>
            <List
              className="mb-6"
              style={{
                height: 350,
                overflow: "auto",
                padding: "8px 24px",
              }}
              itemLayout="horizontal"
              dataSource={filteredUsers}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <div className="text-xs">User ID: {item.userId}</div>
                    }
                  />
                  <div>
                    <Button
                      onClick={() => addMemberToProject(item.userId)}
                      className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                    >
                      Add
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Typography.Title level={5} className="pl-6">
              Already in project
            </Typography.Title>
            <List
              className="mb-6"
              style={{
                height: 350,
                overflow: "auto",
                padding: "8px 24px",
              }}
              itemLayout="horizontal"
              dataSource={projectMembers}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <div className="text-xs">User ID: {item.userId}</div>
                    }
                  />
                  <div>
                    <Button
                      onClick={removeMemberFromProject(item.userId)}
                      className="flex justify-center items-center h-8 bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                    >
                      Remove
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddMemberModal;