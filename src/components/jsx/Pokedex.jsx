import React, { useEffect } from "react";
import axios from 'axios';
import '../css/pokedex.css'

var screenScale
var offset = 0
const limit = 50

async function getPokedex(limit, offset) {
    const pokedex = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    if (pokedex.data.results.length === 0) {
        console.log(pokedex)
        alert("pokedex chegou ao fim")
        window.removeEventListener('scroll', handleScroll)
    } else {
        loadTableData(pokedex)
    }
}

function createTable() {
    const div = document.querySelector('#pokedex')
    const table = document.createElement('table')
        table.id = 'table'
        div.appendChild(table)
}

async function loadTableData(pokedex) {
    const table = document.querySelector('#table')
    if(!table) {
        createTable()
    }
    var row = 0
    let index = 0
    var columns = 5
    screenScale = window.innerWidth
    if (screenScale < 1000) {
        columns = 3
    }
    for (const pokemon of pokedex.data.results) {
        if (index % columns === 0) {
            row = table.insertRow()
            index = 0
        }
        const cell = await row.insertCell()
        await placePokemonFrame(pokemon.name, cell)
        index++
    }
}

async function handleScroll() {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const bodyHeight = document.body.scrollHeight - windowHeight

    if(scrollTop >= (bodyHeight - 100)) {
        offset += 50
        try {
            await getPokedex(limit, offset)
    } catch (error){
        alert(error)
    };
    }
}

async function placePokemonFrame(pokemonName, cell) {
    const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const imageURL = resp.data.sprites.front_default
    let pokemonNewName = pokemonNameConversion(pokemonName)
    const cardURL = `http://localhost:5173/pokemon/${pokemonName}`
    cell.innerHTML = `<a target="_blank" href=${cardURL}><p>${pokemonNewName}</p><img src="${imageURL}" class="pokemonImage" alt="${pokemonNewName}" /></a>`
}

function pokemonNameConversion(pokemonName) {
    let NewName = pokemonName.charAt(0).toUpperCase()
    for (let i = 1; i < pokemonName.length; i++) {
        if (pokemonName[i] === "-") {
            NewName += " "
            NewName += pokemonName[i+1].toUpperCase()
            i++
        } else {
            NewName += pokemonName[i]
        }
    }
    
    return NewName
}

window.addEventListener('scroll', handleScroll)

const Pokedex = () => {
    useEffect(() => {
        offset = 0
        getPokedex(limit, offset)}, [])
    return (
        <>
            <div id="pokedex-header">Main Feed</div>
            <div id="pokedex"></div>
        </>
        
    )
}

export default Pokedex