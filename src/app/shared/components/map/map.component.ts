import { Component, forwardRef, OnInit, Optional, Self } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Draw from 'ol/interaction/Draw';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import { MapBrowserEvent, } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { Geometry } from 'ol/geom';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapComponent),
      multi: true
    }
  ]
})
export class MapComponent implements OnInit, ControlValueAccessor {

  private map: Map;
  private draw: Draw;
  private vectorLayer: VectorLayer<any>;
  private raster: TileLayer<any>;

  public value: Feature | null;

  public onChange: any = () => { };
  public onTouched: any = () => { };

  constructor() {
    // openleayer map
    this.map = new Map({});

    this.raster = new TileLayer({
      source: new OSM(),
    });
    const source = new VectorSource({ wrapX: false });

    this.draw = new Draw({
      source: source,
      type: 'Point',
    });

    this.vectorLayer = new VectorLayer({
      source: source,
    });

    this.value = null;
  }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        projection: 'EPSG:4326',
        center: [-85.27, 10.36],
        zoom: 9,
      }),
      layers: [
        this.raster,
        this.vectorLayer
      ],
      target: 'ol-map'
    });
    this.map.addInteraction(this.draw);
    this.map.on('click', this.onClick);

  }

  onClick = (data: MapBrowserEvent<any>) => {
    this.removeLastFeature(true);
  }

  public removeLastFeature(replaceAction: boolean) {
    let features = this.vectorLayer.getSource().getFeatures();
    if (features.length > 1) {
      let first = features.shift();
      this.vectorLayer.getSource().removeFeature(first);
    }

    if (!replaceAction) {
      if (features.length > 0) {
        let first = features.shift();
        this.vectorLayer.getSource().removeFeature(first);
      }
      this.onChange(null);
      return;
    }

    let writer = new GeoJSON();
    let geoJson = writer.writeFeaturesObject(features).features[0].geometry;
    this.onChange(geoJson);
  }

  writeValue(obj: any): void {
    if (obj) {
      const feature = new GeoJSON().readFeatures(obj);
      this.vectorLayer.getSource().addFeatures(feature);
    }
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw ('Not Implemented')
  }
}
