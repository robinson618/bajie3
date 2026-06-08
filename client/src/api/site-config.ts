import request from './request';

export const siteConfigApi = {
  getList: () =>
    request.get('/site-config'),
  update: (data: any) =>
    request.put('/admin/site-config', data),
  createItem: (data: any) =>
    request.post('/admin/site-config', data),
  removeItem: (key: string) =>
    request.delete(`/admin/site-config/${key}`),
};
