import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs"
import { LoginServiceService } from "./login-service.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginServiceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loginService.isLoggedIn()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.loginService.getAuthorizationHeader()
                }
            })
        }
        return next.handle(req);
    }
}
