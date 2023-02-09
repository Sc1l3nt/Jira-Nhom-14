import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EditUserModal from '../../components/EditUserModal/EditUserModal';
import UserListCard from '../../components/UserListCard/UserListCard';
import { deleteUserApi, getAllUserApi } from '../../redux/reducers/userReducer';

const UsersMobile = () => {
    const dispatch = useDispatch();
    const { userList } = useSelector((state) => state.userReducer);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    useEffect(() => {
        dispatch(getAllUserApi());
    }, [dispatch]);
    const renderUserCard = () => {
        return userList?.map((user) => {
            return <div key={user.userId}>
                <UserListCard user={user} handleEditUser={handleEditUser} handleDelete={handleDelete} />
            </div>
        })
    }
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };
    const handleCancelEditUser = () => {
        setShowEditUserModal(false);
    };
    const handleDelete = (user) => {
        dispatch(deleteUserApi(user.userId));
    }
    return (
        <div className='user-mobile'>
            <div className='container'>
                <div className='title'>
                    <h3>User List</h3>
                </div>
                <div className='content'>
                    {renderUserCard()}
                </div>
                {selectedUser && (
                    <EditUserModal
                        visible={showEditUserModal}
                        onCancel={handleCancelEditUser}
                        user={selectedUser}
                    />
                )}
            </div>
        </div>
    )
}

export default UsersMobile