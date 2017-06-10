import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MouseEvent as MapsMouseEvent } from 'angular2-google-maps/core';
import { Marker } from '../../shared';
import { MAP_DEFAULT } from '../../const/map';

@Component({
  selector: 'cafe-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

	@Input() markers: Array<Marker>;

  zoom: number = MAP_DEFAULT.zoom;

  lat: number = MAP_DEFAULT.lat;
  lng: number = MAP_DEFAULT.lng;
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MapsMouseEvent) {
    this.markers.push(<Marker>{
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }
  
  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}
