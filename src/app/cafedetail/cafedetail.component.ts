import * as moment from 'moment';
import * as _ from 'lodash';
import { RouteAnimation } from '../const/routeanimation';
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService, Marker } from '../shared';
import { SubscriptionManaged } from '../shared';

@Component({
  selector: 'my-cafedetail',
  templateUrl: './cafedetail.component.html',
  styleUrls: ['./cafedetail.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
   },
  animations: [ RouteAnimation ]
})
export class CafeDetailComponent extends SubscriptionManaged implements OnInit, AfterContentInit, OnDestroy {

  private cafe$: Observable<any>;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.cafe$ = this.route.params
      .switchMap((params: Params) => this.cafe$ = this.db.object(`/cafe/${params['id']}`));
  }
  
  ngAfterContentInit() {
    this.sub(this.cafe$.first().subscribe(cafe => {
      this.api.markers.next([<Marker>_.merge(cafe['maps'], { id: cafe.$key, recommend: cafe.recommend })]);
      this.api.location.next(<Marker>cafe['maps']);
      this.api.zoom.next(20);
    }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
