import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    tokenData: any;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    console.log(this.email, this.password);
    let user = {
        email: this.email,
        password : this.password
    };
    if (this.email + this.password) {
      this.authService.logIn(user);
    }
      }
  }

