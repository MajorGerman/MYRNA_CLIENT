import React, {useState, useEffect} from 'react';
import { gql } from 'graphql-request';

import './Mapp.css';

import * as ol from 'ol';
import * as proj from 'ol/proj';
import * as source from 'ol/source';
import * as layer from 'ol/layer';
import * as geom from 'ol/geom';
import * as style from 'ol/style';

import homeMarkerImg from '../img/homemarker3.png';

function Mapp(props) {

  let home = new ol.Feature({
        geometry: new geom.Point(proj.fromLonLat([27.41985955, 59.33215900])),
        name: 'Somewhere near Nottingham',
    });

  const [markers, setMarkers] = useState([home]);

  const map = new ol.Map({
    target: 'map',
    layers: [
      new layer.Tile({
        source: new source.OSM(),
      }),
      new layer.Vector({
        source: new source.Vector({
          features: markers
        }),
        style: new style.Style({
          image: new style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: homeMarkerImg
          })
        })
      })
    ],
    view: new ol.View({
      center: proj.fromLonLat([25, 58.75]),
      zoom: 7
    })
  });

  return (
    <div id="map" className="map">
        <p></p>
        <div id="popup"></div>
    </div>
  )

}

export default Mapp;