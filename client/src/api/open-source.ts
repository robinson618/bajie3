import request from './request';

export const openSourceApi = {
  getList: (page = 1, pageSize = 100, category?: string) =>
    request.get('/open-source', { params: { page, pageSize, category } }),
  getDetail: (id: number) =>
    request.get(`/open-source/${id}`),
  create: (data: any) =>
    request.post('/admin/open-source', data),
  update: (id: number, data: any) =>
    request.put(`/admin/open-source/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/open-source/${id}`),
  getCategories: () =>
    request.get('/open-source/categories'),
  createCategory: (data: any) =>
    request.post('/admin/open-source/categories', data),
  updateCategory: (id: number, data: any) =>
    request.put(`/admin/open-source/categories/${id}`, data),
  removeCategory: (id: number) =>
    request.delete(`/admin/open-source/categories/${id}`),
  getProjects: () =>
    request.get('/open-source'),
};
