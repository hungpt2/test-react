import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading, Dialog, Button, Form, Input, Select } from 'element-react';
import { useUserDispatch, useUserState} from '../../contexts/user';

export const UserForm = (props) => {
  const {
    showModal,
    closeModal,
    type,
    user,
  } = props;

  const dispatchUser = useUserDispatch();
  const { loading } = useUserState();
  const [formUser, setFormUser] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
  });

  useEffect(() => {
    if (!showModal) {
      return;
    }
    if (user) {
      setFormUser({...user});
    } else {
      setFormUser({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
      });
    }
  }, [showModal]); // eslint-disable-line react-hooks/exhaustive-deps

  const formRef = React.createRef(null);

  const onSubmit = () => {
    formRef.current.validate((isValid) => {
      if (isValid) {
        dispatchUser({ type: 'SET_PAYLOAD_USER', payload: formUser });
        closeModal();
      }
    });
  };

  const onChange = (key, value) => {
    setFormUser({
      ...formUser,
      [key]: value,
    });
  };

  return (
    <Dialog
      title={`${type === 'new' ? 'Create' : type === 'edit' ? 'Update' : 'View'} User`}
      size="tiny"
      visible={showModal}
      onCancel={closeModal}
      lockScroll={false}
    >
      <Loading loading={loading}>
        <Dialog.Body>
          <Form ref={formRef} model={formUser} labelWidth='120'>
            {
              user && user.id ?
                <Form.Item label='ID'>
                  <Input value={formUser.first_name} onChange={onChange.bind(this, 'first_name')}></Input>
                </Form.Item>
                : ''
            }
            <Form.Item label='First Name' prop='first_name' rules={{ required: true, message: 'Please input first name', trigger: 'blur' }}>
              <Input className='w-full' value={formUser.first_name} onChange={onChange.bind(this, 'first_name')}></Input>
            </Form.Item>
            <Form.Item label='Last Name' prop='last_name' rules={{ required: true, message: 'Please input last name', trigger: 'blur' }}>
              <Input className='w-full' value={formUser.last_name} onChange={onChange.bind(this, 'last_name')}></Input>
            </Form.Item>
            <Form.Item label='Email' prop='email' rules={{ required: true, type: 'email', message: 'Please input email', trigger: 'blur' }}>
              <Input className='w-full' value={formUser.email} onChange={onChange.bind(this, 'email')}></Input>
            </Form.Item>
            <Form.Item label='Gender' prop='gender' rules={{ required: true, message: 'Please select gender', trigger: 'blur' }}>
              <Select className='w-full' value={formUser.gender} placeholder='Select Gender' onChange={onChange.bind(this, 'gender')}>
                <Select.Option label='Bigender' value='Bigender'></Select.Option>
                <Select.Option label='Male' value='Male'></Select.Option>
                <Select.Option label='Female' value='Female'></Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Dialog.Body>
        <Dialog.Footer className='dialog-footer'>
          <Button onClick={closeModal}>Cancel</Button>
          {
            type !== 'view' ?
              <Button type='primary' onClick={onSubmit}>{ type === 'new' ? 'Create' : 'Update' }</Button>
              : ''
          }
        </Dialog.Footer>
      </Loading>
    </Dialog>
  );
};

UserForm.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.string,
  user: PropTypes.object,
};

export default UserForm;
