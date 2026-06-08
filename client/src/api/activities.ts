import request from './request';

export const activitiesApi = {
  getList: (page = 1, pageSize = 10) =>
    request.get('/activities', { params: { page, pageSize } }),
  getDetail: (id: number) =>
    request.get(`/activities/${id}`),
};
