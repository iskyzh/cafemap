import * as moment from 'moment';
import * as _ from 'lodash';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'my-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
   },
  animations: [
    trigger('routeAnimation', [
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200)
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CafeComponent implements OnInit, AfterViewInit {

  private cafe$: FirebaseListObservable<any>;
  constructor(private db: AngularFireDatabase) {
    this.cafe$ = db.list('/cafe');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
