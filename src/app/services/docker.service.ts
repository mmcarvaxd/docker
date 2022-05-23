import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Docker } from '../classes/docker';
import { DockerVersion } from '../classes/docker-version';

@Injectable({
  providedIn: 'root'
})
export class DockerService {
  apiUrl: string = environment.dockerApi

  constructor(private http: HttpClient) { }

  getDockerVersion(): Observable<DockerVersion> {
    let url = this.apiUrl + '/version'
    return this.http.get<DockerVersion>(url)
  }

  getDockerInfo(): Observable<Docker> {
    let url = this.apiUrl + '/info'
    return this.http.get<Docker>(url)
  }
}
