import * as moment from 'moment';
import * as _ from 'lodash';
import { RouteAnimation } from '../const/routeanimation';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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
export class CafeComponent implements OnInit, AfterContentInit {

  private cafe$: FirebaseListObservable<any>;
  private cafe_count$: Observable<number>;
  private lstUpdate$: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase, private api: ApiService) {
    this.cafe$ = db.list('/cafe');
    this.cafe_count$ = this.cafe$.map(d => d.length);
    this.lstUpdate$ = db.object('/info/lastUpdate');
  }

  ngOnInit() {
  }
  
  ngAfterContentInit() {
    this.cafe$.first().subscribe(cafes => {
      this.api.markers.next(_.map(cafes, c => <Marker>c['maps']))
      this.api.location.next(<Marker>{ lat: MAP_DEFAULT.lat, lng: MAP_DEFAULT.lng });
      this.api.zoom.next(MAP_DEFAULT.zoom);
    });
  }
}
