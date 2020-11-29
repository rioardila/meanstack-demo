import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logIn(form: NgForm) {
    const username = form.value.username;
    this.loginService.logIn(form.value)
    .subscribe(
      (res: any) => {
        this.loginService.token = JSON.parse(JSON.stringify(res.token));
        this.loginService.setToken(this.loginService.token);
        // Update username in navbar
        console.log(form.value.username);
        this.sharedService.updateUsername(username);
        this.router.navigate(['home']).catch(
          err => {
            console.warn(err);
          }
        );
      },
      err => {
        if(err.status === 403) {
          M.toast({ html: 'Wrong user/password', classes: 'red lighten-1' });
        } else {
          M.toast({ html: err.error, classes: 'red lighten-1' });
        }
      },
    );
    this.resetForm(form);
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.loginService.login = new Login();
    }
  }
}
