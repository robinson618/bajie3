import request from './request';

export const footerApi = {
  getList: () =>
    request.get('/footer-items'),
  create: (data: any) =>
    request.post('/admin/footer-items', data),
  update: (id: number, data: any) =>
    request.put(`/admin/footer-items/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/footer-items/${id}`),
};
