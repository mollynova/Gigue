import React from "react";
import "../styles/App.css";

class ArtistPage extends React.Component{
    state = {
        artist = undefined
    }

    render(){
        const artist = this.props.artist;
        console.log(artist);
    }
}