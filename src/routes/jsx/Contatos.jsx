import React, { useEffect } from "react"
import Menu from "../../components/jsx/Menu"
import GitHubIcon from "/github-icon.png"
import Header from "../../components/jsx/Header"
import '../css/contatos.css'

const Contato = () => {
    
    useEffect(() => {
        setIconPath()
    })

    function setIconPath() {
        const githubpng = document.querySelector("#githubpng")
        githubpng.src = GitHubIcon
    }

    return (
        <div id='contacts'>
            <Header />
            <Menu />
            <div id="contactsDiv">
            <h4>Você pode me encontrar no </h4><a target="_blank" href="https://github.com/Caio-PR">Github</a><img id="githubpng"></img>
            </div>
            
        </div>
    )
}

export default Contato