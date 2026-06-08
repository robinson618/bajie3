import request from './request';

export const usersApi = {
  getList: (page = 1, pageSize = 10, keyword?: string) =>
    request.get('/admin/users', { params: { page, pageSize, keyword } }),
  update: (id: number, data: any) =>
    request.put(`/admin/users/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/users/${id}`),
  resetPassword: (id: number, password: string) =>
    request.put(`/admin/users/${id}/reset-password`, { password }),
};
