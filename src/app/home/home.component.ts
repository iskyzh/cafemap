import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MouseEvent as MapsMouseEvent } from 'angular2-google-maps/core';

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private cafe$: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.cafe$ = db.list('/cafe');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
  
  zoom: number = 15;
  
  // initial center position for the map
  lat: number = 31.2121658;
  lng: number = 121.4222251;
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MapsMouseEvent) {
    this.markers.push(<marker>{
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
}
