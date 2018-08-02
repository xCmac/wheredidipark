import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CarProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CarProvider Provider');
  }

}
