import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

export class SubscriptionManaged implements OnDestroy {
  private subscriptions: Array<Subscription>;

  constructor() {
    this.subscriptions = [];
  }

  protected sub(s: Subscription) {
    this.subscriptions.push(s);
  }

  ngOnDestroy() {
    _(this.subscriptions).forEach(s => {
      if(s) s.unsubscribe();
    });
  }
}