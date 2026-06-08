import request from './request';

export const appsApi = {
  getList: (page = 1, pageSize = 10) =>
    request.get('/apps', { params: { page, pageSize } }),
  getDetail: (id: number) =>
    request.get(`/apps/${id}`),
  incrementLike: (id: number) =>
    request.post(`/apps/${id}/like`),
  create: (data: any) =>
    request.post('/admin/apps', data),
  update: (id: number, data: any) =>
    request.put(`/admin/apps/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/apps/${id}`),
};
