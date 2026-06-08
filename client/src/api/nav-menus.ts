import request from './request';

export const navMenusApi = {
  getList: () =>
    request.get('/nav-menus'),
  create: (data: any) =>
    request.post('/admin/nav-menus', data),
  update: (id: number, data: any) =>
    request.put(`/admin/nav-menus/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/nav-menus/${id}`),
};
