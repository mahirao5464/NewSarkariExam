import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{
intercept(req: HttpRequest<any>, next: HttpHandler){

    const idToken = localStorage.getItem('jwt');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned);
        }
        return next.handle(req);
}
}