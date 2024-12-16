import React, { useEffect } from 'react'
import Menu from '../components/Menu'
import Pokedex from '../components/Pokedex'

const Home = () => {
    return (
        <>
            <div id='header-div'>
                <img id='pokeballImg' src='/pokeball.png'/>
                <header>Pokedex</header>
            </div>
            <Menu />
            <Pokedex />
        </>
    )
}

export default Home