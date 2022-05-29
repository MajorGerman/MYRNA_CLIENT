import React, {useState} from 'react';
import { gql } from 'graphql-request';

import './PlaceBlock.css';

import DotsImg from '../img/dots.svg'

function PlaceBlock(props) {

    const [star, setStar] = useState(0);
    const [starStyle, setStarStyle] = useState("");

    let query = gql`
    `;  

    function addToFavorites(e) {
        e.preventDefault();

        try {

            return fetch("https://myrna-server.herokuapp.com/", {
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

  return (

    <div className="placeBlock" id={props.place.id}>
        <div className="placeBlockTop">
            <div className="placeBlockName">
                <p> {props.place.name} </p> 
            </div>
            <div className="placeBlockDots">
                <img src={DotsImg}></img>
            </div>
        </div>
    </div>

  );

}

export default PlaceBlock;
