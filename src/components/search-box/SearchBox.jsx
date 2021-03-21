/* SearchBox Component takes the following props:
        1) Placeholder - Which will be displayed as the placeholder
        2) setSearchedItem - Generic function that sets the state in the parent component. Can be used to search a city 
        & later on for other fields as well
        3) navigate - This will be the route that we want to route to if clicked. This will be defaulted to "/" if null
*/

import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./search-box.scss";

function SearchBox(props){
    //Local State as we'd like to set the SearchedItem state only when search icon is clicked
    const [item, setItem] = useState();
    const path = (props.navigate?props.navigate:"/");
    return (
        <div>
                <input type="search" className="search-bar" placeholder = { props.placeholder} onChange={(event) => setItem(event.target.value)} />
                <Link to= {path}>
                    <BsSearch className="search-icon" onClick={() => props.setSearchedItem(item)}/>
                </Link>
       </div>
    )
}

export default withRouter(SearchBox);