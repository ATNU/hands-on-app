import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import { EmailValidator } from '@angular/forms';
import * as moment from 'moment';

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
        }).toPromise()
        .then((response) => console.log(response))
        .catch(this.handleError);

    }

    logIn(user) {

        return this.http.post(environment.apiBaseURL + '/auth/login', {
            email: user.email,
            password : user.password
        }).toPromise()
        .then((response) => {
            this.setSession(response);
        })
        .catch(this.handleError);

    }

    setSession(authResult) {
        const expiresAt = moment().add(authResult.tokenData.expiresIn, 'second');
        console.log('authrestult');
        console.log(authResult.tokenData);
        console.log(authResult.tokenData.expiresIn);
        console.log(authResult.tokenData.token);
        localStorage.setItem('id_token', authResult.tokenData.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
        console.log(localStorage);
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
