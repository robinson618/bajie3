import request from './request';

export const faqApi = {
  getList: (page = 1, pageSize = 100, category?: string) =>
    request.get('/faq', { params: { page, pageSize, category } }),
  create: (data: any) =>
    request.post('/admin/faq', data),
  update: (id: number, data: any) =>
    request.put(`/admin/faq/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/faq/${id}`),
  getCategories: () =>
    request.get('/faq-categories'),
  createCategory: (data: any) =>
    request.post('/admin/faq-categories', data),
  updateCategory: (id: number, data: any) =>
    request.put(`/admin/faq-categories/${id}`, data),
  removeCategory: (id: number) =>
    request.delete(`/admin/faq-categories/${id}`),
};
