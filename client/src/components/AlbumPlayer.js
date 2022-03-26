import React from "react";

const AlbumPlayer = ({ most_liked_sounds_album }) => {
  most_liked_sounds_album = most_liked_sounds_album["most_liked_sounds_album"]
  console.log(most_liked_sounds_album)
  if(most_liked_sounds_album != null) {
    return (
      <div className="album" id = "album_player">
        <div className="album_info">
          <div className="album_artist">
            <div id="title">{most_liked_sounds_album[3]}</div>
            <div id="artists">{most_liked_sounds_album[2]}</div>
          </div>
          <img
            src={most_liked_sounds_album[1]}
            alt="Album Cover"
            width="170"
            height="170"
            id="album_cover"
          ></img>
        </div>

        <audio id = "audio_file" controls autoplay>
          <source id = "audio_source"
            src={most_liked_sounds_album[0]}
            type="audio/mp3"
          ></source>
        </audio>
      </div>
    );
  } else {
    return (<div>a</div>)
  }
};

export default AlbumPlayer;
