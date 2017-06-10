import { Component } from '@angular/core';
import { ApiService } from './shared';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs';
import { Marker } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private connected$: FirebaseObjectObservable<any>;
  private ready:boolean = false;
  constructor(private api: ApiService, private db: AngularFireDatabase) {
    this.connected$ = db.object('/.info/connected');
    this.connected$.subscribe(d => this.ready = this.ready || d.$value);
  }
}
