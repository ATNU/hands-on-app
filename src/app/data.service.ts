import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


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
    const jwt = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.http.post(environment.apiBaseURL + '/feedback/save', feedbackObject, { headers })
      .toPromise()
      .then((response) => console.log(response))
      .catch(this.handleError);
  }

    // save function for a single page, param is an array as server expects array of pages
    async savePage(pageArray) {
      const jwt = localStorage.getItem('id_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + jwt);

      const requestBody = {
        pages: pageArray
      };

      return this.http.post(environment.apiBaseURL + '/page/sou', requestBody, { headers })
        .toPromise()
        .then((response) => {
          console.log(response);
        })
        .catch(this.handleError);
    }

      // resume function for a single page, gets furthest page available
      async resume()  {
        const jwt = localStorage.getItem('id_token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
          responseType: 'text',
          observe: 'response'
        });

        return this.http.get(environment.apiBaseURL + '/page/resume', {
          headers
        })
          .toPromise()
          .then((response) => {

            return response;
          })
          .catch(this.handleError);
      }

      async getPageForUser(pageNo: number)  {
        const jwt = localStorage.getItem('id_token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
          responseType: 'text',
          observe: 'response'
        });

        return this.http.get(environment.apiBaseURL   + '/page/pageNumber/' + pageNo, { headers })
          .toPromise()
          .then((response) => {

            return response;
          })
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
    const jwt = localStorage.getItem('id_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jwt,
      responseType: 'text',
      observe: 'response'
    });

    return this.http.get(environment.apiBaseURL + '/text', {
      headers
    })
      .toPromise()
      .then((response) => response)
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

  async getPage(pageID) {
    return await this.http.get(environment.apiBaseURL + '/page/pageID/' + pageID, {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
    })
      .toPromise()
      .then((response) => JSON.parse(response.body))
      .catch(this.handleError);
  }

  async getAllFeedbacks() {
    return await this.http.get(environment.apiBaseURL + '/feedback/all', {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
    })
      .toPromise()
      .then((response) => JSON.parse(response.body))
      .catch(this.handleError);
  }



  // save function where pages are stored in local storage, not currently used as exceeding limits
  async saveProgress() {
    const jwt = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    const requestBody = {
      pages: JSON.parse(localStorage.getItem('pageList')) || []
    };

    return this.http.post(environment.apiBaseURL + '/page/sou', requestBody, { headers })
      .toPromise()
      .then((response) => {
        console.log(response);
        localStorage.removeItem('pageList');
      })
      .catch(this.handleError);
  }



}
