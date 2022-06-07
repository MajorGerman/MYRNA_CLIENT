import React, {useState, useEffect} from 'react';
import { gql } from 'graphql-request';

import PlaceBlock from '../PlaceBlock/PlaceBlock';

import Mapp from '../Mapp/Mapp';

import './Map.css';
import { set } from 'ol/transform';

function Map (props) {

  const [places, setPlaces] = useState([]);
  const [nearPlaces, setNearPlaces] = useState([]);

  const [userLocation, setUserLocation] = useState({});

  const [mapStyle, setMapStyle] = useState("map");

  const [iconLatitude, setIconLatitude] = useState(0);
  const [iconLongitude, setIconLongitude] = useState(0);
  
  let query = gql`
    query GetAllPlaces {
      getAllPlaces {
        id
        name
        location {
          id
          latitude
          longitude
        }
      }
    }
  `;

  let query2 = gql`
    query GetUserById {
      getUserById(id: ${localStorage.getItem("user_id")}) {
          location {
            id
            latitude
            longitude
          }
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

  async function getData2() {
    try {
        return await fetch(process.env.REACT_APP_SERVER_IP, {
            headers: {'Content-Type': 'application/json', 'verify-token': localStorage.getItem("token")},
            method: 'POST',
            body: JSON.stringify({"query": query2})
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
    
    getData().then((a) => {
      console.log(a.data.getAllPlaces);
      setPlaces([].concat(places, a.data.getAllPlaces));
    })    

    getData2().then((a) => {
      setUserLocation(a.data.getUserById.location);

      setIconLatitude(a.data.getUserById.location.latitude); 
      setIconLongitude(a.data.getUserById.location.longitude);
    })

  }, [])


  return(
      <div className='mapPage'>
          <p className='mapPageText'>Map</p>
          <div className='mapDiv'>
              <Mapp iconLatitude={iconLatitude} iconLongitude={iconLongitude}></Mapp>
          </div>
          <p className="nearPlacesText"> Places near you </p>
          <div className='nearPlacesSearch'>
              <input type="text" placeholder='Pitsameistrid...'></input>
              <input type="button" value=" Search "></input>
          </div>
          <div className='nearPlacesDiv'>
            <div className="nearPlaces">
              { places.map( (place) => <PlaceBlock key={place.id} place={place}/> ) }
            </div>
          </div>
      </div>
  )
}

export default Map