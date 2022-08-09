import React, { useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'element-react';

import {
  getListUser,
  deleteUser,
  createUser,
  editUser,
} from '../../services/user';

import { UserContext } from './UserContext';

const propTypes = {
  children: PropTypes.node,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_LIST_USER':
      return {
        ...state,
        listUser: action.payload,
      };

    case 'SET_PAGING_LIST_USER':
      return {
        ...state,
        paging: action.payload,
      };

    case 'SET_PARAM_LIST_USER':
      return {
        ...state,
        pramsList: action.payload,
      };

    case 'SET_DELETE_USER':
      return {
        ...state,
        deleteUserId: action.payload,
      };

    case 'SET_PAYLOAD_USER':
      return {
        ...state,
        payloadUser: action.payload,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    listUser: [],
    paging: {
      page: 0,
      pageSize: 10,
      totalPage: 0,
      total: 0,
    },
    pramsList: null,
    loading: false,
    deleteUserId: null,
    payloadUser: null,
  });
  const value = useMemo(() => ({ state, dispatch }), [state]);
  const { pramsList, deleteUserId, payloadUser } = state;
  useEffect(() => {
    if (!pramsList) {
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    getListUser(pramsList).then(({ data, paging }) => {
      dispatch({
        type: 'SET_LIST_USER',
        payload: data
      });
      dispatch({
        type: 'SET_PAGING_LIST_USER',
        payload: paging
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, () => {
      dispatch({ type: 'SET_LOADING', payload: false });
      Notification.error({
        title: 'Error',
        message: 'Something went wrong!'
      });
    });
  }, [pramsList]);


  useEffect(() => {
    if (deleteUserId) {
      dispatch({ type: 'SET_LOADING', payload: true });
      deleteUser(deleteUserId).then(() => {
        dispatch({
          type: 'SET_PARAM_LIST_USER',
          payload: {...pramsList},
        });
        Notification({
          title: 'Success',
          type: 'success',
          message: 'Deleted User!'
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, () => {
        dispatch({ type: 'SET_LOADING', payload: false });
        Notification.error({
          title: 'Error',
          message: 'Something went wrong!'
        });
      });
    }
  }, [deleteUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (payloadUser) {
      dispatch({ type: 'SET_LOADING', payload: true });
      const exec = !payloadUser.id ? createUser : editUser;
      exec(payloadUser).then((res) => {
        dispatch({
          type: 'SET_PARAM_LIST_USER',
          payload: {...pramsList},
        });
        Notification({
          title: 'Success',
          type: 'success',
          message: `${payloadUser.id ? 'Updated' : 'Created'} User!`
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, () => {
        dispatch({ type: 'SET_LOADING', payload: false });
        Notification.error({
          title: 'Error',
          message: 'Something went wrong!'
        });
      });
    }
  }, [payloadUser]); // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = propTypes;
