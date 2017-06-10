import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
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

  _lat: number = MAP_DEFAULT.lat;
  _lng: number = MAP_DEFAULT.lng;
  _zoom: number = MAP_DEFAULT.zoom;

  animation$: Subscription;
  animations: any;

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

  animate(ori, dst, interval) {
    return { ori, dst, interval, step: (dst - ori) / interval };
  }

  bound(current, animation) {
    if (Math.abs(current - animation.dst) < Math.abs(animation.step)) return animation.dst;
    return current + animation.step;
  }

  ngOnInit() {
    this.animation$ = Observable.interval(1000 / 60).subscribe(() => {
      if (this.animations) {
        this._lat = this.bound(this._lat, this.animations[0]);
        this._lng = this.bound(this._lng, this.animations[1]);
        // this._zoom = this.bound(this._zoom, this.animations[2]);
        console.log(this._lat);
      }
    });
  }

  ngOnDestroy() {
    if (this.animation$) this.animation$.unsubscribe();
  }

  ngOnChanges() {
    this.animations = [
      this.animate(this._lat, this.lat, 30),
      this.animate(this._lng, this.lng, 30),
      this.animate(this._zoom, this.zoom, 30)
    ]
  }
}
