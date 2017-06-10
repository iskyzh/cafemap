import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CafeComponent } from './cafe/cafe.component';
import { CafeDetailComponent } from './cafedetail/cafedetail.component';
import { ExploreComponent } from './explore/explore.component';

import { ApiService } from './shared';
import { routing } from './app.routing';

import { LoadingComponent, MapComponent } from './components';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'angular2-moment';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FIREBASE_CONFIG, MAPS_CONFIG } from './config/service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    routing,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    MomentModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({ apiKey: MAPS_CONFIG.apiKey })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    MapComponent,
    CafeComponent,
    CafeDetailComponent,
    ExploreComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
