import React, { useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserApi } from '../../../redux/reducers/userReducer';
import EditUserModal from '../../EditUserModal/EditUserModal';
import { Link } from 'react-router-dom';
import { getTaskId } from '../../../redux/reducers/taskReducer';

const Search = (props) => {
    const { widthLong, widthShort } = props;
    const [options, setOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [widthSearch, setWidthSearch] = useState(widthShort);
    const dispatch = useDispatch();
    const { userList } = useSelector((state) => state.userReducer);
    const { projectList } = useSelector((state) => state.projectReducer);

    useEffect(() => {
        dispatch(getAllUserApi());
    }, [dispatch]);

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };

    const searchResult = (query) => {
        const name = query.toLowerCase()
        const arrayUser = userList?.filter(item => item.name.toLowerCase().includes(name))
        const listUser = arrayUser?.map((item) => {
            const category = `${item.name}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#0d6efd'
                        }}
                        onClick={handleEditUser(item)}
                    >
                        <span>
                            User: {category}
                        </span>
                        <span className='ms-1'>
                            ID: {item.userId} (User)
                        </span>
                    </div>
                ),
            };
        })
        const arrayProject = projectList?.filter(item => item.projectName.toLowerCase().includes(name))
        const listProject = arrayProject?.map((item) => {
            const category = `Project: ${item.projectName}`;
            return {
                value: category,
                label: (
                    <Link
                        to={`/projects/${item.id}/board`}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#198754'
                        }}
                        onClick={() => {
                            dispatch(getTaskId({ id: item.id, name: item.projectName }))
                        }}
                    >
                        <span>
                            {category}
                        </span>
                        <span className='ms-1'>
                            ID: {item.id} (Project)
                        </span>
                    </Link>
                ),
            };
        })
        return [...listUser, ...listProject]
    }
    // Edit
    const handleEditUser = (user) => () => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };

    const handleCancelEditUser = () => {
        setShowEditUserModal(false);
    };

    return (
        <>
            <AutoComplete
                style={{ width: widthSearch, transition: 'all .5s' }}
                options={options}
                onSearch={handleSearch}
                onFocus={() => setWidthSearch(widthLong)}
                onBlur={() => setWidthSearch(widthShort)}
            >
                <Input
                    allowClear
                    placeholder="Search ..."
                    prefix={<SearchOutlined className='fs-5 me-2 text-primary' />}
                    size="large"
                />
            </AutoComplete>
            {selectedUser && (
                <EditUserModal
                    visible={showEditUserModal}
                    onCancel={handleCancelEditUser}
                    user={selectedUser}
                />
            )}
        </>
    );
}

export default Search