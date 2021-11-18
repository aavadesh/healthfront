import { Component, DebugElement, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';

import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password) .pipe(first()).subscribe(
    data => {
      this.tokenStorage.saveToken(JSON.stringify(data));
        this.tokenStorage.saveUser(data.userDetails);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().role;
        this.reloadPage();
        this.router.navigate(['panel/author']);
    },
    error => {
      debugger
      if (error.status == 0)
      {
        this.errorMessage = "The Service did not Respond";
      }
      else{
    this.errorMessage = error.error;
      }
    this.isLoginFailed = true;
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
