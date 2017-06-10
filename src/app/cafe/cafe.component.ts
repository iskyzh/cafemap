import * as moment from 'moment';
import * as _ from 'lodash';
import { RouteAnimation } from '../const/routeanimation';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ApiService, Marker } from '../shared';
import { MAP_DEFAULT } from '../const/map';

@Component({
  selector: 'my-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
   },
  animations: [ RouteAnimation ]
})
export class CafeComponent implements OnInit, AfterViewInit {

  private cafe$: FirebaseListObservable<any>;
  constructor(private db: AngularFireDatabase, private api: ApiService) {
    this.cafe$ = db.list('/cafe');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cafe$.first().subscribe(cafes => this.api.markers.next(_.map(cafes, c => <Marker>c['maps'])))
    this.api.location.next(<Marker>{ lat: MAP_DEFAULT.lat, lng: MAP_DEFAULT.lng });
    this.api.zoom.next(MAP_DEFAULT.zoom);
  }
}
