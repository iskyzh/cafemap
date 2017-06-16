import * as moment from 'moment';
import * as _ from 'lodash';
import { RouteAnimation } from '../const/routeanimation';
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ApiService, Marker } from '../shared';
import { MAP_DEFAULT } from '../const/map';
import { SubscriptionManaged } from '../shared';

@Component({
  selector: 'my-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
   },
  animations: [ RouteAnimation ]
})
export class CafeComponent extends SubscriptionManaged implements OnInit, AfterContentInit, OnDestroy {

  private cafe$: FirebaseListObservable<any>;
  private cafe_count$: Observable<number>;
  private lstUpdate$: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase, private api: ApiService) {
    super();
    this.cafe$ = db.list('/cafe');
    this.cafe_count$ = this.cafe$.map(d => d.length);
    this.lstUpdate$ = db.object('/info/lastUpdate');
  }

  ngOnInit() {
  }
  
  ngAfterContentInit() {
    this.sub(this.cafe$.first().subscribe(cafes => {
      this.api.markers.next(_.map(cafes, c => <Marker>_.merge(c['maps'], { id: c['$key'], recommend: c['recommend'] })));
      this.api.location.next(<Marker>{ lat: MAP_DEFAULT.lat, lng: MAP_DEFAULT.lng });
      this.api.zoom.next(MAP_DEFAULT.zoom);
    }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
