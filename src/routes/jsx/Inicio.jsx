import React, { useEffect } from 'react'
import Menu from '../../components/jsx/Menu.jsx'
import Pokedex from '../../components/jsx/Pokedex.jsx'
import Header from '../../components/jsx/Header.jsx'

const Inicio = () => {
    return (
        <>
            <Header />
            <Menu />
            <Pokedex />
        </>
    )
}

export default Inicio