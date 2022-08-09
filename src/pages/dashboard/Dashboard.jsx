import React, { lazy, useState } from 'react';
import { Button } from 'element-react';

const UserTable = lazy(() => import('../../components/list-user/UserTable'));
const UserForm = lazy(() => import('../../components/user-form/UserForm'));


const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold leading-5">List User</div>
        <Button
          type="primary"
          onClick={() => setShowAddModal(true)}
        >
          Add User
        </Button>
      </div>
      
      <div className="w-100 mt-10">
        <UserTable />
      </div>

      <UserForm
        showModal={showAddModal}
        type='new'
        closeModal={() => { setShowAddModal(false) }}
      />
    </div>
  );
};
export default Dashboard;
