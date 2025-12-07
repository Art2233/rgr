import { HttpInterceptorFn } from '@angular/common/http';

const API_BASE_URL = 'http://localhost:8080/api';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith('http')) {
        return next(req);
    }

    const apiReq = req.clone({ url: `${API_BASE_URL}/${req.url.replace(/^\/+/, '')}` });
    return next(apiReq);
};