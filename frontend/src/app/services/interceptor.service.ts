import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) { }

  intercept(req: any, next: any) {
    let loginService = this.injector.get(LoginService);
    // Add token in the header when logged in
    if (loginService.loggedIn()) {
      let tokenizedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loginService.getToken()}`,
        }
      });
      return next.handle(tokenizedRequest);
    } else if (this.router.url === '/login') {
      return next.handle(req);    
    } else {
      this.router.navigate(['login']).catch(
        err => {
          console.warn(err);
        }
      );
    }
  }
}
