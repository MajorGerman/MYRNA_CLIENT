import React, {useState, useEffect} from 'react';
import Update from '../Update/Update';
import "./AllUpdates.css"

function AllUpdates (props) {

    const [updates, setUpdates] = useState([])

    async function getData() {

        try {

            const res = await fetch("https://myrna-server.herokuapp.com/", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({"query": "query Query {getAllUpdates {id }}"})
            })
            let resp = await res.json()
            return resp || [];

        } catch (err) {

            console.log(err)

        }       
    }

    

    useEffect(() =>{
        setUpdates(getData())
    }, [])
    
    return(
        <div>
            {updates.map((update) => <Update update={update}/>)}
        </div>
    )
}

export default AllUpdates