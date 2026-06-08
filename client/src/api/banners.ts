import request from './request';

export const bannersApi = {
  getList: () =>
    request.get('/banners'),
  create: (data: any) =>
    request.post('/admin/banners', data),
  update: (id: number, data: any) =>
    request.put(`/admin/banners/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/banners/${id}`),
};
