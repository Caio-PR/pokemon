import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <nav className="Menu">
            <Link className="MenuObj" to="/">Home</Link>
            <Link className="MenuObj" to="/contacts">Contacts</Link>
        </nav>
    )
}

export default Menu