import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MouseEvent as MapsMouseEvent } from 'angular2-google-maps/core';
import { Marker } from '../../shared';
import { MAP_DEFAULT } from '../../const/map';

@Component({
  selector: 'cafe-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges, OnInit, OnDestroy {

	@Input() markers: Array<Marker>;
  @Input() lat: number = MAP_DEFAULT.lat;
  @Input() lng: number = MAP_DEFAULT.lng;
  @Input() zoom: number = MAP_DEFAULT.zoom;

  constructor(private router: Router) {

  }

  clickedMarker(id: string, index: number) {
    this.router.navigate(['/cafe', id])
  }
  
  mapClicked($event: MapsMouseEvent) {
  }
  
  markerDragEnd(m: Marker, $event: MouseEvent) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngOnChanges() {
  }
}
