import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {
  apiUrl: string = environment.dockerApi
  constructor(private http: HttpClient) { }

  getAllContainers() {
    let url = this.apiUrl + '/containers/json' //get
  }

  getContainer(Id: string) {
    let url = this.apiUrl + `/containers/${Id}/json` //get
  }

  startContainer(Id: string) {
    let url = this.apiUrl + `/containers/${Id}/start` //post
  }

  stopContainer(Id: string) {
    let url = this.apiUrl + `/containers/${Id}/stop` //post
  }

  deleteContainer(Id: string) {
    let url = this.apiUrl + `/containers/${Id}` //delete
  }

  createContainer() {
    let url = this.apiUrl + `/containers/create` //post
  }
}
