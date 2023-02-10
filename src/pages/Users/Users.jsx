import { Button, Popconfirm, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserApi, getAllUserApi } from "../../redux/reducers/userReducer";
import EditUserModal from "../../components/EditUserModal/EditUserModal";

const Users = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.userReducer);
  const [state, setState] = useState({ filteredInfo: null, sortedInfo: null });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  useEffect(() => {
    dispatch(getAllUserApi());
  }, [dispatch]);

  const customedListForNumber = userList?.map((item, index) => {
    return { ...item, orderNumber: index + 1, key: item.userId };
  });

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const handleEditUser = (user) => () => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleCancelEditUser = () => {
    setShowEditUserModal(false);
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "No.",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: "6%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        //
        let name1 = a.name?.trim().toLowerCase();
        let name2 = b.name?.trim().toLowerCase();

        if (name1 < name2) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
      width: "25%",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === "userId" && sortedInfo.order,
      ellipsis: true,
      width: "12%",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="small">
          {/* edit button */}
          <Button icon={<EditOutlined />} onClick={handleEditUser(record)} />

          {/* delete button*/}
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch(deleteUserApi(record.userId));
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={customedListForNumber}
        onChange={handleChange}
      />

      {selectedUser && (
        <EditUserModal
          visible={showEditUserModal}
          onCancel={handleCancelEditUser}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default Users;
