import request from './request';

export const skillsApi = {
  getList: (page = 1, pageSize = 10, skillCategory?: string) =>
    request.get('/skills', { params: { page, pageSize, skillCategory } }),
  getDetail: (id: number) =>
    request.get(`/skills/${id}`),
  getCategories: () =>
    request.get('/skill-categories'),
  incrementView: (id: number) =>
    request.post(`/skills/${id}/view`),
  incrementDownload: (id: number) =>
    request.post(`/skills/${id}/download`),
  create: (data: any) =>
    request.post('/admin/skills', data),
  update: (id: number, data: any) =>
    request.put(`/admin/skills/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/skills/${id}`),
  createCategory: (data: any) =>
    request.post('/admin/skill-categories', data),
  updateCategory: (id: number, data: any) =>
    request.put(`/admin/skill-categories/${id}`, data),
  removeCategory: (id: number) =>
    request.delete(`/admin/skill-categories/${id}`),
};
