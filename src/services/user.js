export const getListUser = ({ page, pageSize }) => {
  const userData = localStorage.getItem('userData');
  const data = JSON.parse(userData);
  return Promise.resolve({
    data: data.slice((page - 1) * pageSize, (page) * pageSize),
    paging: {
      total: data.length,
      totalPage: Math.round(data.length / pageSize),
      page,
      pageSize,
    }
  });
};

export const createUser = (payload) => {
  const userData = localStorage.getItem('userData');
  const data = JSON.parse(userData);
  const id = Math.floor(Math.random() * 9999);
  const newUser = {
    id,
    ...payload,
  };
  data.unshift(newUser);
  localStorage.setItem('userData', JSON.stringify(data));
  return Promise.resolve(newUser);
};

export const editUser = (payload) => {
  const userData = localStorage.getItem('userData');
  const data = JSON.parse(userData);
  const idx = data.findIndex(user => user.id === payload.id);
  if (idx > -1) {
    data[idx] = payload;
  }
  localStorage.setItem('userData', JSON.stringify(data));
  return Promise.resolve(payload);
};

export const deleteUser = (userId) => {
  const userData = localStorage.getItem('userData');
  const data = JSON.parse(userData);
  const idx = data.findIndex(user => user.id === userId);
  if (idx > -1) {
    data.splice(idx, 1);
  }
  localStorage.setItem('userData', JSON.stringify(data));
  return Promise.resolve({ id: userId });
};
