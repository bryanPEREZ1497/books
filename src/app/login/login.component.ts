import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router) {
    this.formLogin = this.newFormLogin();
  }

  ngOnInit(): void {

  }

  newFormLogin(): FormGroup {
    return this.formBuilder.group({
      email: ['bryanhdpm@hotmail.es', [Validators.required]],
      // email: [null, [Validators.required]],
      password: ['root', [Validators.required]],
      // password: [null, [Validators.required]],
    });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.login();
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  login() {
    this.httpService.login(this.formLogin.value)
      .subscribe(
        response => {
          this.redirect();
        }
      );
  }


  redirect() {
    this.router.navigate(['/book']);
  }

  get emailField() {
    return this.formLogin.controls['username'];
  }

  get passwordField() {
    return this.formLogin.controls['password'];
  }

  get deviceNameField() {
    return this.formLogin.controls['deviceName'];
  }

}
