import request from './request';

export const seoApi = {
  getList: (page = 1, pageSize = 10) =>
    request.get('/seo', { params: { page, pageSize } }),
  create: (data: any) =>
    request.post('/admin/seo', data),
  update: (id: number, data: any) =>
    request.put(`/admin/seo/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/seo/${id}`),
};
