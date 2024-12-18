import React from "react";
import { Link } from "react-router-dom";
import '../css/menu.css'

const Menu = () => {
    return (
        <nav className="Menu">
            <Link className="MenuObj" to="/">Início</Link>
            <Link className="MenuObj" to="/contatos">Contatos</Link>
        </nav>
    )
}

export default Menu