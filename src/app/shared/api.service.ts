import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Marker } from './models/marker';

@Injectable()
export class ApiService {

  public markers: Subject<Array<Marker>>;
  public location: Subject<Marker>;
  public zoom: Subject<number>;
  
  constructor() {
    this.markers = new Subject<Array<Marker>>();
    this.location = new Subject<Marker>();
    this.zoom = new Subject<number>();
  }
}
