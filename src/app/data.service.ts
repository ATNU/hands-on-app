import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
    canvasJSON: string;
    canvasSVG: string;

  constructor(
    private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

   async saveFeedback(feedbackObject) {
        return this.http.post(environment.apiBaseURL + '/feedback/save', feedbackObject)
            .toPromise()
            .then((response) => console.log(response))
            .catch(this.handleError);
    }

  async getAllFeedbackAndCanvas() {
    return await this.http.get(environment.apiBaseURL + '/feedback/all', {
      headers: new HttpHeaders()
          .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
    })
        .toPromise()
        .then((response) => JSON.parse(response.body))
        .catch(this.handleError);
  }

  async getFeedbackAndCanvas(Id: string) {
        return this.http.get(environment.apiBaseURL + '/feedback/' + Id, {
            headers: new HttpHeaders()
                .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
        })
            .toPromise()
            .then((response) => response.body)
            .catch(this.handleError);
    }

async getText() {
    return this.http.get(environment.apiBaseURL + '/text', {
        headers: new HttpHeaders()
            .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
    })
        .toPromise()
        .then((response) => response.body)
        .catch(this.handleError);
}

async getUserResults(ID) {
    return await this.http.get(environment.apiBaseURL + '/app/user?ID=' + ID, {
        headers: new HttpHeaders()
            .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
    })
        .toPromise()
        .then((response) => JSON.parse(response.body))
        .catch(this.handleError);
}

    async getUserSummaries() {
        return await this.http.get(environment.apiBaseURL + '/app/users', {
            headers: new HttpHeaders()
                .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
        })
            .toPromise()
            .then((response) => JSON.parse(response.body))
            .catch(this.handleError);
    }

    async getFeedback(feedbackID) {
        return await this.http.get(environment.apiBaseURL + '/feedback/' + feedbackID, {
            headers: new HttpHeaders()
                .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
        })
            .toPromise()
            .then((response) => JSON.parse(response.body))
            .catch(this.handleError);
    }


}
