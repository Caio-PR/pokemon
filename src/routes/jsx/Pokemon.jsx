import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../css/pokemon.css'
import Menu from '../../components/jsx/Menu'
import Header from '../../components/jsx/Header'

const Pokemon = () => {

    const { pokemonName } = useParams()

    useEffect(() => {
        if (pokemonName) {
            insertPokemon(pokemonName)
        }
    }, [pokemonName])

    async function pokemonNameConversion(pokemonName) {
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

    async function insertPokemon(pokemonName) {
        try {
            const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const cellTipo = document.querySelector('#tipo');
            const cellNome = document.querySelector('#nome'); 
            const cellsprite = document.querySelector('#sprite');

            const promises = resp.data.types.map(async (typeURL) => {
                if (typeURL.hasOwnProperty("type")) {
                    console.log(typeURL)
                    const url = typeURL.type.url
                    const imageUrl = await getPokemonType(url)
                    return `<img src="${imageUrl}" alt="${typeURL.type.name}">`
                }
            })

            const imgTags = await Promise.all(promises)
            
            cellTipo.innerHTML = imgTags.join('')
            cellNome.innerHTML = await pokemonNameConversion(resp.data.name);
            cellsprite.src = resp.data.sprites.front_default
        } catch (error) {
            console.error('Erro ao carregar os dados do Pokémon:', error)
        }
    }
    async function getPokemonType(typeURL) {
        try {
            const apiTipo = await axios.get(typeURL);
            const imagemURL = apiTipo.data.sprites["generation-viii"]["sword-shield"].name_icon;
            return imagemURL;
        } catch (error) {
            console.error('Erro ao carregar os dados do tipo de Pokémon:', error);
            return '';
        }
    }

    return (
        <div id="Pokecard">
            <Header />
            <Menu />
            <table id="pokemon-card">
                <tbody>
                    <tr className='pokemon-card-header'>
                        <td>Tipo</td>
                        <td>Nome</td>
                        <td>Sprite</td>
                    </tr>
                    <tr className='pokemon-card-value'>
                        <td id="tipo"></td>
                        <td id="nome"></td>
                        <td><img src="" id='sprite'></img></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><img id="imagemPokemon"></img></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Pokemon