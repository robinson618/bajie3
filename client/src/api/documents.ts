import request from './request';

export const documentsApi = {
  getList: (page = 1, pageSize = 10, categoryId?: number) =>
    request.get('/documents', { params: { page, pageSize, category_id: categoryId } }),
  getDetail: (id: number) =>
    request.get(`/documents/${id}`),
  create: (data: any) =>
    request.post('/admin/documents', data),
  update: (id: number, data: any) =>
    request.put(`/admin/documents/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/documents/${id}`),
  getCategories: () =>
    request.get('/document-categories'),
  createCategory: (data: any) =>
    request.post('/admin/document-categories', data),
  updateCategory: (id: number, data: any) =>
    request.put(`/admin/document-categories/${id}`, data),
  removeCategory: (id: number) =>
    request.delete(`/admin/document-categories/${id}`),
  getSubcategories: () =>
    request.get('/doc-subcategories'),
  getCategoryDetail: (id: number) =>
    request.get(`/doc-categories/${id}`),
  getSubcategoryDetail: (id: number) =>
    request.get(`/doc-subcategories/${id}`),
};
