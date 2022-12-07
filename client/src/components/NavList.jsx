import React from "react";
import { Link } from "react-router-dom";

import '../styles/scss/NavList.scss'

export default function NavList(props) {
   return (
      <ul id="navOptions" ref={props.navOptions}>
         <li><Link to="/" style={{all: "unset"}}> Home </Link></li>
         <li><Link to="/account" style={{all: "unset"}}> My Account </Link></li>
         <li><Link to="/purchase" style={{all: "unset"}}> Purchase Credits </Link></li>
         <li><Link to="/admin" style={{all: "unset"}}> Admin </Link></li>
      </ul>
   );
};