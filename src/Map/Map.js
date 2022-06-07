import React, {useState, useEffect} from 'react';
import { gql } from 'graphql-request';

import PlaceBlock from '../PlaceBlock/PlaceBlock';

import * as ol from 'ol';
import * as proj from 'ol/proj';
import * as source from 'ol/source';
import * as layer from 'ol/layer';

import './Map.css';

import env from 'react-dotenv';

function Map (props) {

  const [nearPlaces, setNearPlaces] = useState([]);

  const [mapStyle, setMapStyle] = useState("map");

  let map = new ol.Map({
      target: 'map',
      layers: [
        new layer.Tile({
          source: new source.OSM()
        })
      ],
      view: new ol.View({
        center: proj.fromLonLat([25, 58.75]),
        zoom: 7
      })
    });

  let query = gql`
    query GetUserById {
      getUserById(id: ${localStorage.getItem("user_id")}) {
        roles
        }
    }
  `;

  async function getData() {
      try {
          return await fetch(process.env.REACT_APP_SERVER_IP, {
              headers: {'Content-Type': 'application/json'},
              method: 'POST',
              body: JSON.stringify({"query": query})
          }).then((a) =>{
              return a.json()
          }).then((b) => {
              return b
          })

      } catch (err) {
          console.log(err)
      }       
  }

  useEffect(() => {

    setNearPlaces(nearPlaces.concat(nearPlaces, [{"id": 1, "name": "Pizza Kiosk Narva"}, {"id": 2, "name": "Hesburger Pähklimäe"}]))

    // window.location.href = "http://localhost:3000/allPosts";
    // getData().then((a) =>{
    //   a = a.data.validateToken;
    //   console.log(a);
    //   if (!a) {
    //     window.location.href = "http://localhost:3000/allPosts";
    //     props.setLogin(true);
    //   }
    // });
  }, [])

  function mapResize() {
    document.getElementById('map').addEventListener('transitionend', () => {
      setInterval(map.updateSize, 1000) 
    });
    if (mapStyle == "map") {
      setMapStyle("map map-bigger");
      document.getElementById('map').innerHTML = "";
    } else {
      setMapStyle("map");
      document.getElementById('map').innerHTML = "";
    }
  }

  return(
      <div className='mapPage'>
          <p onClick={mapResize} className='mapPageText'>Map</p>
          <div className='mapDiv'>
              <div id='map' className={mapStyle}></div>
          </div>
          <p className='nearPlacesText'> Places near you </p>
          <div className='nearPlacesSearch'>
              <input type="text" placeholder='Pitsameistrid...'></input>
              <input type="button" value=" Search "></input>
          </div>
          <div className='nearPlacesDiv'>
            <div className="nearPlaces">
              { nearPlaces.map( (place) => <PlaceBlock key={place.id} place={place}/> ) }
            </div>
          </div>
      </div>
  )
}

export default Map