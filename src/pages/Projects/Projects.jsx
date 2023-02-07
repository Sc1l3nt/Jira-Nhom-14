import {
  Avatar,
  Button,
  Col,
  Input,
  List,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteProjectApi,
  getAllProjectApi,
} from "../../redux/reducers/projectReducer";
import { history } from "../../index";

const Projects = () => {
  const dispatch = useDispatch();
  const tableIsBreak = useMediaQuery({ maxWidth: 624 });
  const debounceSearchRef = useRef(null);
  const { projectList } = useSelector((state) => state.projectReducer);

  const dataSource = projectList.map((project) => {
    return { ...project, key: project.id };
  });

  useEffect(() => {
    dispatch(getAllProjectApi());
  }, [dispatch]);

  const handleSearch = (e) => {
    let params = {};

    if (e.target.value.length > 0) {
      params = { keyword: e.target.value };
    }

    if (debounceSearchRef.current) {
      clearTimeout(debounceSearchRef.current);
    }

    debounceSearchRef.current = setTimeout(() => {
      dispatch(getAllProjectApi(params));
    }, 400);
  };

  const showConfirmDeleteProjectModal = ({ projectName, id: projectId }) => {
    return () => {
      Modal.confirm({
        title: `Are you sure to delete\n${projectName}?`,
        okText: "Delete",
        zIndex: 1050,
        centered: true,
        onOk: () => {
          handleDeleteProject(projectId);
        },
        cancelText: "Cancel",
      });
    };
  };

  const handleDeleteProject = (projectId) => {
    dispatch(deleteProjectApi(projectId));
    showProjectDeletedSuccessfullyModal();
  };

  const showProjectDeletedSuccessfullyModal = () => {
    dispatch(getAllProjectApi());
    Swal.fire({
      title: "Project deleted successfully",
      icon: "success",
      showConfirmButton: false,
    });
  };

  return (
    <>
      <div className="mb-3 d-flex align-items-start">
        <Typography.Title level={3} className="flex-grow me-5">
          Projects
        </Typography.Title>
        <div className="d-flex justify-content-between">
          <Button type="primary" className="me-5">
            <Link to="/projects/new" style={{ textDecoration: "none" }}>
              Create project
            </Link>
          </Button>
          <Input
            allowClear
            suffix={<SearchOutlined />}
            className="w-75"
            onChange={handleSearch}
          />
        </div>
      </div>

      {!tableIsBreak && (
        <Table dataSource={dataSource}>
          <Table.Column
            title="Id"
            dataIndex="id"
            key="id"
            sorter={(a, b) => a.id - b.id}
          />
          <Table.Column
            title="Project name"
            dataIndex="projectName"
            key="projectName"
            render={(projectName, record) => (
              <Link to={`/projects/${record.id}/board`}>{projectName}</Link>
            )}
            sorter={(a, b) => a.projectName.localeCompare(b.projectName)}
          />
          <Table.Column
            title="Category name"
            dataIndex="categoryName"
            key="categoryName"
            sorter={(a, b) => a.categoryName.localeCompare(b.categoryName)}
          />
          <Table.Column
            title="Creator"
            key="creator"
            render={(record) => <>{record.creator.name}</>}
            sorter={(a, b) => a.creator.name.localeCompare(b.creator.name)}
          />
          <Table.Column
            title="Members"
            dataIndex="members"
            key="members"
            render={(members) => {
              return (
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {members.map((member) => (
                    <Tooltip title={member.name} key={member.userId}>
                      <Avatar src={member.avatar} />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              );
            }}
          />
          <Table.Column
            title="Actions"
            key="actions"
            render={(record) => {
              return (
                <Space size="small">
                  <EditOutlined
                    onClick={() => {
                      history.push(`/projects/${record.id}/edit`);
                    }}
                  />

                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={showConfirmDeleteProjectModal(record)}
                  />
                </Space>
              );
            }}
          />
        </Table>
      )}

      {tableIsBreak && (
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={dataSource}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item className="block">
              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Project name</Typography.Text>
                </Col>
                <Col span={14}>
                  <Link to={`/projects/${item.id}/board`}>
                    {item.projectName}
                  </Link>
                </Col>
              </Row>

              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Category name</Typography.Text>
                </Col>
                <Col span={14}>{item.categoryName}</Col>
              </Row>

              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Creator</Typography.Text>
                </Col>
                <Col span={14}>{item.creator.name}</Col>
              </Row>

              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Members</Typography.Text>
                </Col>
                <Col span={14}>
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {item.members.map((member) => (
                      <Tooltip title={member.name} key={member.userId}>
                        <Avatar src={member.avatar} />
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </Col>
              </Row>
              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Actions</Typography.Text>
                </Col>
                <Col span={14}>
                  <Link to={`/projects/${item.id}/edit`}>
                    <EditOutlined />
                  </Link>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={showConfirmDeleteProjectModal(item)}
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default Projects;
