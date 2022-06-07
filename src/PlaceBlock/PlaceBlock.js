import React, {useState} from 'react';
import { gql } from 'graphql-request';

import './PlaceBlock.css';

import DotsImg from '../img/dots.svg'

import placeImg from '../img/pizzakiosk.jpg';

function PlaceBlock(props) {

    const [star, setStar] = useState(0);
    const [starStyle, setStarStyle] = useState("");

    const [dotsMenuStyle, setDotsMenuStyle] = useState("hidden dotsMenu")
    const [dotsMenuButtonStyle, setDotsMenuButtonStyle] = useState("dotsMenuButton")

    let query = gql`
    `;  

    function addToFavorites(e) {
        e.preventDefault();
        try {
            return fetch(process.env.REACT_APP_SERVER_IP, {
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

    
    function placeBlockDots() {
        if (dotsMenuStyle != "dotsMenu") {
            setDotsMenuStyle("dotsMenu");
        } else {
            setDotsMenuStyle("hidden dotsMenu");
        }
    }

  return (

    <div className="placeBlock" id={props.place.id}>
        <div className="placeBlockTop">
            <div className="placeBlockInfo">
                <div className="placeBlockAvatar">
                    <img src={placeImg}></img>
                </div>
                <div className="placeBlockName">
                    <p> {props.place.name} </p> 
                </div>  
            </div>
            <div className="placeBlockDots">
                <div style={{borderRight: "solid 0.1vw #E9E9E9", height: '30px'}}></div>
                <img onClick={placeBlockDots} src={DotsImg}></img>
                <div className={dotsMenuStyle}>
                    <div className={dotsMenuButtonStyle}> Add to corner ⭐</div>
                    <div className={dotsMenuButtonStyle}> Hide and forget ⛔️ </div>
                </div>
            </div>
        </div>
    </div>

  );

}

export default PlaceBlock;
