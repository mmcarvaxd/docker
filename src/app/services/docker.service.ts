import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Docker } from '../classes/docker';

@Injectable({
  providedIn: 'root'
})
export class DockerService {
  apiUrl: string = environment.dockerApi

  constructor(private http: HttpClient) { }

  getDockerInfo(): Observable<Docker> {
    let url = this.apiUrl + '/info'
    return this.http.get<Docker>(url)
  }
}
