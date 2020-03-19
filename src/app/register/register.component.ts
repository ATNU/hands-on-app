import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    email: string;
    password: string;

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
          this.authService.signUp(user);
      }
  }
}
