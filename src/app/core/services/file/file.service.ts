import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@enviroment/environment';
import { Observable } from 'rxjs';

const URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public upload(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('upload', file);

    const req = new HttpRequest('POST', `${URL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
