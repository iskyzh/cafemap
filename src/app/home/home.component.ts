import * as moment from 'moment';
import * as _ from 'lodash';
import { RouteAnimation } from '../const/routeanimation';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ApiService, Marker } from '../shared';
import { MAP_DEFAULT } from '../const/map';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ RouteAnimation ]
})
export class HomeComponent implements AfterContentInit {
  private __version: string = process.env.VERSION;
  
  constructor(private api: ApiService) {
  }

  ngAfterContentInit() {
    this.api.location.next(<Marker>{ lat: MAP_DEFAULT.lat, lng: MAP_DEFAULT.lng });
    this.api.zoom.next(MAP_DEFAULT.zoom);
    this.api.markers.next([]);
  }
}
