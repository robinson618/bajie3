import request from './request';

export const pagesApi = {
  getList: (page = 1, pageSize = 10) =>
    request.get('/pages', { params: { page, pageSize } }),
  getDetail: (id: number) =>
    request.get(`/pages/${id}`),
  create: (data: any) =>
    request.post('/admin/pages', data),
  update: (id: number, data: any) =>
    request.put(`/admin/pages/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/pages/${id}`),
};
