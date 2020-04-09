import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import { EmailValidator } from '@angular/forms';
import * as moment from 'moment';
import { map, filter, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class AuthService {

    constructor(private http: HttpClient) {
    }

    signUp(user) {
        console.log('register');
        return this.http.post(environment.apiBaseURL + '/auth/signup', {
            email: user.email,
            password : user.password
        });

    }

    logIn(user) {

        return this.http.post<any>(environment.apiBaseURL + '/auth/login', {
            email: user.email,
            password : user.password
        }).pipe(
            map( response => {
                this.setSession(response);
                return response;
            }));

    }

    setSession(authResult) {
        const expiresAt = moment().add(authResult.tokenData.expiresIn, 'second');
        localStorage.setItem('id_token', authResult.tokenData.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
