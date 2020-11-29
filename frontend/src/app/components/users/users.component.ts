import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';

declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  addUser(form: NgForm) {
    // Update user
    if (form.value._id) {
      this.userService.replaceUser(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Saved successfully!'});
          this.getUsers();
        });
    } else { // Create new user
      this.userService.createUser(form.value)
      .subscribe(
        res => {
          this.resetForm(form);
          M.toast({html: 'Saved successfully!'});
          this.getUsers();
        },
        err => {
          if(err.status === 403) {
            // Remove stored cookie
            this.loginService.removeToken();
            this.router.navigate(['login']).catch(
              err => {
                console.warn(err);
              }
            );
          } else {
            M.toast({ html: err.error, classes: 'red lighten-1' });
          }
        }
      );
    }
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        res => {
          this.userService.users = res as User[];
        },
        err => {
          if(err.status === 403) {
            // Remove stored cookie
            this.loginService.removeToken();
            this.router.navigate(['login']).catch(
              err => {
                console.warn(err);
              }
            );
          } else {
            M.toast({ html: err.error, classes: 'red lighten-1' });
          }
        },
      );
  }

  editUser(user: User) {
    this.userService.selectedUser = user;
    setTimeout(() => { 
      M.updateTextFields()
    }, 0);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUser(user._id)
        .subscribe(
          res => {
            M.toast({html: 'Deleted successfully!', classes: 'green accent-3'});
            this.getUsers();
          },
          err => {
            if(err.status === 403) {
              // Remove stored cookie
              this.loginService.removeToken();
              this.router.navigate(['login']).catch(
                err => {
                  console.warn(err);
                }
              );
            } else {
              M.toast({ html: err.error, classes: 'red lighten-1' });
            }
          },
        );
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.userService.selectedUser = new User();
      //document.getElementById("firstName").focus();
    }
  }

}
