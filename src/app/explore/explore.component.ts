import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'my-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterViewInit {

  private cafe$: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.cafe$ = db.list('/cafe');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
