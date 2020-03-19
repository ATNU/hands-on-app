import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import * as moment from 'moment';
import { first } from 'rxjs/operators';

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
  showError: Boolean;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
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
    this.authService.logIn(user).subscribe(status => {
      this.showError = false;
      this.router.navigateByUrl('/home');
    },
      error => {
        this.showError = true;
      });
  }

  onRegisterClick(): void {
    this.router.navigateByUrl('/register');
  }
}

