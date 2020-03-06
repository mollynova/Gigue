import React from "react";
import "../styles/App.css";

class ArtistPage extends React.Component{
    state = {
        artist : ""
    }

    render(){
        const artist = this.props.location.state.artist;
        console.log(this.props);
        return(
            <h2>{artist}</h2>
            
        )
    }
}

export default ArtistPage;