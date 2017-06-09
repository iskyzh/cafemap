import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'my-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.scss']
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
