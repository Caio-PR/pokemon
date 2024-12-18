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

    async function insertPokemon(pokemonName) {
        try {
            const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const cellTipo = document.querySelector('#tipo');
            const cellNome = document.querySelector('#nome'); 
            const cellEvolucao = document.querySelector('#evolucao');
            cellNome.innerHTML = resp.data.name;
            const promises = resp.data.types.map(async (typeObj) => {
                if (typeObj.hasOwnProperty("type")) {
                    const url = typeObj.type.url;
                    const imageUrl = await getPokemonType(url);
                    return `<img src="${imageUrl}" alt="${typeObj.type.name}">`;
                }
            });
            const imgTags = await Promise.all(promises);
            cellTipo.innerHTML = imgTags.join('');
        } catch (error) {
            console.error('Erro ao carregar os dados do Pokémon:', error);
        }
    }
    async function getPokemonType(typeURL) {
        try {
            const apiTipo = await axios.get(typeURL);
            const imagemURL = apiTipo.data.sprites["generation-iii"].emerald.name_icon;
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
            <table id="pokemon-table">
                <tbody>
                    <tr>
                        <td>Tipo</td>
                        <td>Nome</td>
                        <td>Evolução</td>
                    </tr>
                    <tr>
                        <td id="tipo"></td>
                        <td id="nome"></td>
                        <td id="evolucao"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Pokemon