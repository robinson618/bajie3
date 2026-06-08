import request from './request';

export const authApi = {
  login: (email: string, password: string) =>
    request.post('/auth/login', { email, password }),
  register: (data: any) =>
    request.post('/auth/register', data),
  getProfile: () =>
    request.get('/auth/profile'),
};
