import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/item';

@Injectable({
  providedIn: 'root'
})
export class ItemServicesService {
  baseURL:string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private _httpClient: HttpClient) { }

  public getUserList() {
    return this._httpClient.get<User[]>(`${this.baseURL}`)
  }

}
