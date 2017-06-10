import * as moment from 'moment';
import * as _ from 'lodash';
import { RouteAnimation } from '../const/routeanimation';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService, Marker } from '../shared';

@Component({
  selector: 'my-cafedetail',
  templateUrl: './cafedetail.component.html',
  styleUrls: ['./cafedetail.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
   },
  animations: [ RouteAnimation ]
})
export class CafeDetailComponent implements OnInit, AfterViewInit {

  private cafe$: Observable<any>;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private api: ApiService) {
    
  }

  ngOnInit() {
    this.cafe$ = this.route.params
      .switchMap((params: Params) => this.cafe$ = this.db.object(`/cafe/${params['id']}`));
  }

  ngAfterViewInit() {
    this.cafe$.first().subscribe(cafe => {
      this.api.markers.next([<Marker>cafe['maps']]);
      this.api.location.next(<Marker>cafe['maps']);
      this.api.zoom.next(20);
    });
  }
}
