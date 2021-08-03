import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  , styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error: {code: number, message: string} = null;

  
  form: any  = {
    username: null,
    password: null
  };
  

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService, 
      private tokenStorage: TokenStorageService
      ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })  

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }  
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.error = null;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.error = err;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  /*
    import {Component, OnInit} from "@angular/core";
    import {Validators, FormGroup, FormBuilder} from "@angular/forms";
    import {LoginObject} from "./shared/login-object.model";
    import {AuthenticationService} from "./shared/authentication.service";
    import {StorageService} from "../core/services/storage.service";
    import {Router} from "@angular/router";
    import {Session} from "../core/models/session.model";
    @Component({
      selector: 'login',
      templateUrl: 'login.component.html'
    })

    export class LoginComponent implements OnInit {
      public loginForm: FormGroup;
      public submitted: Boolean = false;
      public error: {code: number, message: string} = null;

      constructor(private formBuilder: FormBuilder,
                  private authenticationService: AuthenticationService,
                  private storageService: StorageService,
                  private router: Router) { }

      ngOnInit() {
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
        })
      }

      public submitLogin(): void {
        this.submitted = true;
        this.error = null;
        if(this.loginForm.valid){
          this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
            data => this.correctLogin(data),
            error => {
              this.error = error;
            }
          )
        }
      }

      private correctLogin(data: Session){
        this.storageService.setCurrentSession(data);
        this.router.navigate(['/home']);
      }
    }
*/
}
