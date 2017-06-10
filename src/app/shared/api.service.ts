import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Marker } from './models/marker';

@Injectable()
export class ApiService {

  public markers: Subject<Array<Marker>>;
  constructor() {
    this.markers = new Subject<Array<Marker>>();
  }
}
