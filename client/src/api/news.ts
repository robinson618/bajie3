import request from './request';

export const newsApi = {
  getList: (page = 1, pageSize = 10, category?: string) =>
    request.get('/news', { params: { page, pageSize, category } }),
  getDetail: (id: number) =>
    request.get(`/news/${id}`),
  getTrending: () =>
    request.get('/news/trending'),
  create: (data: any) =>
    request.post('/admin/news', data),
  update: (id: number, data: any) =>
    request.put(`/admin/news/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/news/${id}`),
};
