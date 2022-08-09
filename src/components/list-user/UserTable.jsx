import React, { useEffect, useState, lazy } from 'react';
import { get } from 'lodash';
import { Loading, Table, Pagination, Button } from 'element-react';
import { useUserDispatch, useUserState} from '../../contexts/user';

const ConfirmModal = lazy(() => import('../confirm-modal/Confirm'));
const UserForm = lazy(() => import('../../components/user-form/UserForm'));

export const UserTable = (props) => {
  const dispatchUser = useUserDispatch();
  const { listUser, paging, loading } = useUserState();

  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('edit');
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const [contentModal, setContentModal] = useState('');
  
  const params = {
    page: 1,
    pageSize: 10,
  };

  useEffect(() => {
    fetchDataTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataTable = () => {
    dispatchUser({ type: 'SET_PARAM_LIST_USER', payload: params });
  };

  const onParamChanged = (property, value) => {
    params[property] = value;
    fetchDataTable();
  };

  const deleteUser = (user) => {
    setUserEdit(user);
    setContentModal(`Are you sure to delete ${get(user, 'first_name')} ${get(user, 'last_name')}`);
    setShowConfirmModal(true);
  };

  const editUser = (user) => {
    setUserEdit(user);
    setShowAddModal(true);
    setAddType('edit');
  };

  const viewUser = (user) => {
    setUserEdit(user);
    setShowAddModal(true);
    setAddType('view');
  };

  const onDeleteUser = () => {
    dispatchUser({ type: 'SET_DELETE_USER', payload: userEdit.id });
    setUserEdit(null);
    setShowConfirmModal(false);
  };

  const columns = [
    {
      label: 'ID',
      prop: 'id',
    },
    {
      label: 'First Name',
      prop: 'first_name',
    },
    {
      label: 'Last Name',
      prop: 'last_name',
    },
    {
      label: 'Email',
      prop: 'email',
    },
    {
      label: 'Gender',
      prop: 'gender',
    },
    {
      label: 'Action',
      render: (row)=>{
        return <div>
          <Button type='info' size='small' icon="document" onClick={viewUser.bind(this, row)} />
          <Button type='warning' size='small' icon="edit" onClick={editUser.bind(this, row)} />
          <Button type='danger' size='small' icon="delete" onClick={deleteUser.bind(this, row)} />
        </div>
      }
    }
  ];

  return (
    <Loading loading={loading}>
      <Table
        className='w-100'
        emptyText='No Data.'
        columns={columns}
        data={listUser}
      />
      <Pagination
        className='mt-5'
        layout='total, sizes, prev, pager, next'
        total={paging.total}
        pageSizes={[5, 10, 20, 50, 100]}
        pageSize={paging.pageSize}
        currentPage={paging.page}
        onSizeChange={(value) => { onParamChanged('pageSize', value) }}
        onCurrentChange={(value) => { onParamChanged('page', value) }}
      />
      
      <ConfirmModal
        showModal={showConfirmModal}
        title='Delete User'
        content={contentModal}
        acceptBtn='Delete'
        rejectBtn='Cancel'

        closeModal={() => { setShowConfirmModal(false) }}
        rejectFn={() => { setShowConfirmModal(false) }}
        acceptFn={onDeleteUser}
      />
      <UserForm
        showModal={showAddModal}
        user={userEdit}
        type={addType}
        closeModal={() => { setShowAddModal(false) }}
      />
    </Loading>
  );
};
export default UserTable;
