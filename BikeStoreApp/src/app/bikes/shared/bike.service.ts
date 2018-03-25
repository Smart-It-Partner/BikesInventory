import { Injectable } from '@angular/core';
import {Bike} from './bike.model';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class BikeService {

  selectedBike : Bike;
  bikesList : Bike[];

  constructor(private http : Http) { }

  postBikes(bike : Bike){
    var body = JSON.stringify(bike);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions})
    return this.http.post('http://localhost:52128/api/Bikes',body,requestOptions).map(x => x.json());
  }
  getBikesList(){
    return this.http.get('http://localhost:52128/api/Bikes')
    .map((data : Response) => {
      return data.json() as Bike[];
    }).toPromise().then(x => {
      this.bikesList = x;     
    })
  }
  updateBike(bikeID : number,bike : Bike){
    var body = JSON.stringify(bike);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put, headers : headerOptions})
    return this.http.put('http://localhost:52128/api/Bikes/'+ bikeID ,body,requestOptions).map(res => res.json());
  }
  deleteBike(bikeID : number){
    return this.http.delete('http://localhost:52128/api/Bikes/'+ bikeID).map(res => res.json());
  }

}
