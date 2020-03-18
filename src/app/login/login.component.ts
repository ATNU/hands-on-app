import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import {AlertService} from "../alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  tokenData: any;
  returnUrl: string;
  showError: boolean;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
    this.showError = false;
  }


  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }
  onSubmit(): void {
    let user = {
      email: this.email,
      password: this.password
    };
    this.authService.logIn(user)
        .pipe(first())
        .subscribe(
            data => {
              console.log('successful login');
              this.authService.setSession(data);
              this.router.navigate(['/home']);
            },
            error => {
              this.alertService.error(error);
            }
        );
  };

  onRegisterClick(): void {
    this.router.navigateByUrl('/register');
  }
}

