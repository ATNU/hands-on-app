import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../auth.service';
import {AlertService} from "../alert/alert.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    email: string;
    password: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
  }


  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onSubmit() {
      // reset alerts on submit
      this.alertService.clear();

    console.log(this.email, this.password);
    let user = {
        email: this.email,
        password : this.password
    };
    if (this.email + this.password) {
          this.authService.signUp(user)
              .pipe(first())
              .subscribe(
                  data => {
                      this.router.navigate(['/login']);
                  },
                  error => {
                      this.alertService.error(error);
                  }
              );
      }
  }

  onLoginClick() {
      this.router.navigate(['/login']);
  }
}
