import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ExceptionInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(e => {
                if(e) {
                    if(e.status === 400){
                        if(e.error.errors) {
                            throw e.error;
                        }
                        else {
                            this.toastr.error(e.error.message, e.error.statusCode);
                        }
                        this.toastr.error(e.error.message, e.error.statusCode);
                    }
                    if(e.status === 401) {
                        
                    }
                    if(e.status === 404) {
                        this.router.navigateByUrl('/notFound');
                        this.toastr.error("Not Found", "404");
                    }
                    if(e.status === 500) {
                        this.router.navigateByUrl('/serverError');
                    }
                }

                return throwError(e);
            })
        );
    }

}