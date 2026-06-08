import request from './request';

export const commonApi = {
  getBanners: () => request.get('/banners'),
  getStats: () => request.get('/stats'),
  getSiteConfig: () => request.get('/site-config'),
  getNavMenus: () => request.get('/nav-menus'),
  getFooterItems: () => request.get('/footer-items'),
  getPageBanner: (slug: string) => request.get(`/page-banners/${slug}`),
  getPageSeo: (slug: string) => request.get(`/page-seo/${slug}`),
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadMedia: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post('/upload/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
