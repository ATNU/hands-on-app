import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

   async saveFeedback(canvasIdSupplied, textSupplied) {
      const feedbackObject = {canvasId : canvasIdSupplied, text : textSupplied};
      console.log(feedbackObject);
      console.log('call to ' + environment.apiBaseURL + '/feedback/save' );
      return this.http.post(environment.apiBaseURL + '/feedback/save', feedbackObject)
          .toPromise()
          .then((response) => console.log(response))
          .catch(this.handleError);
    }

  async getAllCanvas() {
    return await this.http.get(environment.apiBaseURL + '/canvas/all', {
      headers: new HttpHeaders()
          .set('Content-Type', 'text/json'), responseType: 'text', observe: 'response'
    })
        .toPromise()
        .then((response) => JSON.parse(response.body))
        .catch(this.handleError);
  }
}
