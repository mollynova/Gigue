import React from "react";
import "../styles/App.css";
import "../styles/artist.css";

const ArtistInfo = props => {
    //Call Api here? Connect to Spotify
    console.log(props);
    return(
        <div className="artist-page">
            <h1>{props.artistPage}</h1>
        </div>
        
    );
}

class ArtistPage extends React.Component{
    state = {
        artist : ""
    }

    render(){
        const artist = this.props.location.state.artist;
        console.log(this.props);
        return(

            <ArtistInfo artistPage={artist}></ArtistInfo>
            
        )
    }
}

export default ArtistPage;