import React, { useEffect } from "react"
import Menu from "../components/Menu"
import GitHubIcon from "/github-icon.png"

const Contacts = () => {
    
    useEffect(() => {
        setIconPath()
    })

    function setIconPath() {
        const githubpng = document.querySelector("#githubpng")
        githubpng.src = GitHubIcon
    }

    return (
        <div id='contacts'>
            <header>Contacts</header>
            <Menu />
            <div id="contactsDiv">
            <h4>You can reach me out on </h4><a target="_blank" href="https://github.com/Caio-PR">Github</a><img id="githubpng"></img>
            </div>
            
        </div>
    )
}

export default Contacts