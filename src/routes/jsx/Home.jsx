import React, { useEffect } from 'react'
import Menu from '../../components/jsx/Menu.jsx'
import Pokedex from '../../components/jsx/Pokedex.jsx'
import Header from '../../components/jsx/Header.jsx'

const Home = () => {
    return (
        <>
            <Header />
            <Menu />
            <Pokedex />
        </>
    )
}

export default Home