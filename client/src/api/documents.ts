import request from './request';

export const documentsApi = {
  getList: (page = 1, pageSize = 10, categoryId?: number) =>
    request.get('/documents', { params: { page, pageSize, categoryId } }),
  getDetail: (id: number) =>
    request.get(`/documents/${id}`),
  create: (data: any) =>
    request.post('/admin/documents', data),
  update: (id: number, data: any) =>
    request.put(`/admin/documents/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/documents/${id}`),
  getCategories: () =>
    request.get('/doc-categories'),
  createCategory: (data: any) =>
    request.post('/admin/doc-categories', data),
  updateCategory: (id: number, data: any) =>
    request.put(`/admin/doc-categories/${id}`, data),
  removeCategory: (id: number) =>
    request.delete(`/admin/doc-categories/${id}`),
  getSubcategories: () =>
    request.get('/doc-subcategories'),
  getCategoryDetail: (id: number) =>
    request.get(`/doc-categories/${id}`),
  getSubcategoryDetail: (id: number) =>
    request.get(`/doc-subcategories/${id}`),
};
