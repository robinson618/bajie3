import request from './request';

export const discussionsApi = {
  getList: (page = 1, pageSize = 10, keyword?: string) =>
    request.get('/discussions', { params: { page, pageSize, keyword } }),
  getDetail: (id: number) =>
    request.get(`/discussions/${id}`),
  create: (data: any) =>
    request.post('/admin/discussions', data),
  update: (id: number, data: any) =>
    request.put(`/admin/discussions/${id}`, data),
  remove: (id: number) =>
    request.delete(`/admin/discussions/${id}`),
  togglePin: (id: number, pinned: boolean) =>
    request.put(`/admin/discussions/${id}`, { isPinned: pinned }),
  getHotTopics: () =>
    request.get('/discussions/hot'),
  getActiveUsers: () =>
    request.get('/discussions/active-users'),
  getComments: (id: number) =>
    request.get(`/discussions/${id}/comments`),
  postComment: (id: number, data: any) =>
    request.post(`/discussions/${id}/comments`, data),
};
