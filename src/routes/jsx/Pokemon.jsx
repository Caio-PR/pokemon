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
            const pokemonCard = document.querySelector('#pokemon-card')
            pokemonCard.innerHTML = `<div id='name_content'>Nome Pokemon</div>
            <div id='image_title'>Imagem</div>
            <div id='image_content'><img id='sprite' src="" /></div>
            <div id='type_title'>Tipo</div>
            <div id='type_content'></div>
            <div id='base_title'>Base Status</div>
            <div id='base_content'></div>`
            
            const img_type = document.querySelector('#type_content');
            const divNome = document.querySelector('#name_content'); 
            const imgSprite = document.querySelector('#sprite');
            
            const base_content = document.querySelector('#base_content')

            const promises = resp.data.types.map(async (typeURL) => {
                if (typeURL.hasOwnProperty("type")) {
                    const url = typeURL.type.url
                    const imageUrl = await getTypeURL(url)
                    return `<img class="type_img" src="${imageUrl}" alt="${typeURL.type.name}">`
                }
            })
            imgSprite.src = resp.data.sprites.front_default
            divNome.innerHTML = await pokemonNameConversion(resp.data.name)
            
            const imgTags = await Promise.all(promises)
            for (let a of imgTags) {
                img_type.innerHTML += a
            }

            for (let a of resp.data.stats) {
                base_content.innerHTML += await pokemonNameConversion(a.stat.name) + ": " + a.base_stat + "<br />"
            }
            

        } catch (error) {
            console.error('Erro ao carregar os dados do Pokémon:', error)
        }
    }
    async function getTypeURL(url) {
        try {
            const apiTipo = await axios.get(url);
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
            <div id='pokemon-card'></div>
        </div>
    )
}

export default Pokemon