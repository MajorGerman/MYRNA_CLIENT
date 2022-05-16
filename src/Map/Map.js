import React, {useState, useEffect} from 'react';
import { gql } from 'graphql-request';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Map.css';

import env from 'react-dotenv';

function Map (props) {
   
    const center = {
        lat: 59.3577613,
        lng: 27.4199823
    };

    return(

        <div className='mapPage'>

            <p className='mapPageText'>Map</p>

            <div className='mapDiv'>

                <LoadScript googleMapsApiKey={process.env.REACT_APP_APIKEY}>

                    <GoogleMap 
                        mapContainerClassName="map"
                        center={center}
                        zoom={14}
                        clickableIcons={false}
                        mapTypeId="terrain"
                        options={{
                            streetViewControl: false,
                            scaleControl: false,
                            mapTypeControl: false,
                            panControl: false,
                            zoomControl: false,
                            rotateControl: false,
                            fullscreenControl: false}}>
                    </GoogleMap>

                </LoadScript>
            </div>

        </div>
    )
}

export default Map