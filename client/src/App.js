import React, { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import Panel from "./components/Panel";
import { StackedCarousel } from "react-stacked-carousel";
//import "react-stacked-carousel/dist/index.css";
import "./carousel.css";
import { SliderData } from "./components/SliderData";
import ImageSlider from "./components/ImageSlider";
import AlbumPlayer from "./components/AlbumPlayer";
import VideoPlayer from "./components/VideoPlayer";
import VideoPanel from "./components/VideoPanel";
import html2canvas from "html2canvas";
import { FaPlay } from "react-icons/fa";

function App() {
  // VARIABLES
  const [data, setData] = useState([{}]);
  const [userData, setUserData] = useState([{}]);
  const [user, setUser] = useState("");
  const [invisible, setInvisible] = useState(true);
  const [sliderData, setSliderData] = useState([]);
  const [soundData, setSoundData] = useState([]);
  const [albumSucks, setAlbumSucks] = useState(<></>);
  const isFirstRender = useRef(true);
  // UI variables
  const [usernameInputField, setUsernameInputField] = useState("");
  const [loading, setLoading] = useState(false)
  // card carousel stuff
  const [card, setCard] = useState(null);
  const onCardChange = (event) => {
    console.log("Card", event);
  };

  // PANEL UPDAToR
  useEffect(() => {
    if (!isFirstRender.current) {
      createSlides();
    }
  }, [userData], [albumSucks]);

  // RUN ONCE
  useEffect(() => {
    isFirstRender.current = false;
    fetch("/programmers")
      .then(
        // fetch programmers data
        (res) => res.json()
      )
      .then((data) => {
        setData(data);
        console.log(data);
      });
    let path = window.location.pathname.slice(1);
    let shared = path.slice(6)
    if (path.slice(0,5) == "share" && shared.length > 5){
      console.log(shared)
      let butt = document.getElementById('submit_button')
      setUsernameInputField(shared)
      setUser(shared);
      console.log(`Account name entered was: ${shared}`);
      fetch(`/user/${shared}`)
      .then(
        // fetch userData
        (res) => res.json()
      )
      .then((data) => {
        setSoundData(data.most_liked_sounds_album["most_liked_sounds_album"])
        setAlbumSucks(<AlbumPlayer most_liked_sounds_album = {data.most_liked_sounds_album}></AlbumPlayer>)
        setUserData(data);
        console.log("pp", data.most_liked_sounds_album["most_liked_sounds_album"])
      });
    }
  }, []);

  const fetchVideo = (id) => {
    fetch(`/video/${id}`)
      .then(
        // fetch userData
        (res) => res.json()
      )
      .then((data) => {
        console.log("fetch video data:", data);
        return data;
      })
    }

  const fetchUser = (event) => {
    event.preventDefault();
    setUser(usernameInputField);
    setLoading(true)
    console.log(`Account name entered was: ${usernameInputField}`);
    fetch(`/user/${usernameInputField}`)
      .then(
        // fetch userData
        (res) => res.json()
      )
      .then((data) => {
        setSoundData(data.most_liked_sounds_album["most_liked_sounds_album"])
        setAlbumSucks(<AlbumPlayer most_liked_sounds_album = {data.most_liked_sounds_album}></AlbumPlayer>)
        setUserData(data);
        console.log("pp", data.most_liked_sounds_album["most_liked_sounds_album"])
      });
  };


  const handleSoundChange = (index) => {
    console.log("SOUND: ",index)
    let sound_id = userData.most_liked_sounds_id[index]
    
    fetch(`/audio/${sound_id}`)
      .then(
        // fetch userData
        (res) => res.json()
      )
      .then((data) => {
        //setAlbumSucks(<AlbumPlayer most_liked_sounds_album = {data}/>);
        document.getElementById('album_cover').src = data["most_liked_sounds_album"][1];
        document.getElementById('title').innerText = data["most_liked_sounds_album"][3];
        document.getElementById('artists').innerText = data["most_liked_sounds_album"][2];
        let audioPlayer = document.getElementById('audio_file')
        document.getElementById('audio_source').src = data["most_liked_sounds_album"][0];
        audioPlayer.load()
        console.log(data);
      });
  };
  const handleVideoChange = (index) => {
    console.log("Video: ",index)
    let video_id = userData.most_common_hashtags_videos[index]
    
    fetch(`/video/${video_id}`)
      .then(
        // fetch userData
        (res) => res.json()
      )
      .then((data) => {
        //setAlbumSucks(<AlbumPlayer most_liked_sounds_album = {data}/>);
        // document.getElementById('video').src = data["address"];
        // document.getElementById('title').innerText = data["most_liked_sounds_album"][3];
        // document.getElementById('artists').innerText = data["most_liked_sounds_album"][2];
        let videoPlayer = document.getElementById('video')
        document.getElementById('video_source').src = data["address"];;
        videoPlayer.load()
        console.log(data);
      });
  }

  const createSlides = () => {
    console.log("data", userData);

    console.log("hashtags div");
    const userProfileDiv = (
      <div className="user_profile_panel">
        <div id="print" className="userProfileDiv">
          <img
            src={userData.profilePicture}
            alt="Profile Picture"
            className="profile_pic"
          />
          <div className="user_bio">
            <div className="user_alias">{user}</div>
            <div className="user_name">{userData.username}</div>
            <div className="user_stats">
              <div className="stat_name">Followers: <b>{userData.follower_count}</b> </div>
              <div className="stat_name">Following: <b>{userData.following_count}</b></div>
              <div className="stat_name"> Likes: <b>{userData.likes_count}</b></div>
            </div>
          </div>
        </div>
        <div className="scraped_stats_div overview">
          <div className="stat">
            Your average watch video duration: &nbsp;
            <b>{Math.round(userData.average_liked_duration/userData.num_liked_videos)}s</b>   
          </div>
          <div className="stat">
            Your average liked video views:{" "}
            <b>{Math.round(userData.average_liked_views / userData.average_liked_duration)} views</b>
              
          </div>
          <div className="stat">
            Your average liked video likes:{" "}
            <b>{Math.round(userData.average_liked_likes / userData.average_liked_duration)} likes</b> 
          </div>
          <div className="stat">Scraped <b>{userData.num_liked_videos}</b> of your liked videos

          </div>
          <div className="stat">Saw <b>{userData.creator_count}</b> creators</div>
          <div className="stat">Analyzed <b>{userData.hashtag_count}</b> hashtags</div>
          <div className="stat">Saved <b>{userData.sound_count}</b> sounds</div>

        </div>
      </div>
    );
    setSliderData((sliderData) => [...sliderData, userProfileDiv]);

    console.log("creator div");
    const favouriteCreatorsDiv = (
      <div className="creators_panel" id="print">
        <div className="title_text">Your Top Creators</div>
        {userData.most_liked_users.map((hasht, i) => (
          <div className="creator_row" key={i}>
            <div className="rank_number">{i + 1}</div>

            <img
              src={hasht[2]}
              alt="Profile Picture"
              width="78"
              height="78"
            ></img>
            <div className="creater_username">{hasht[0]}</div>
            <div>❤ {hasht[1]}</div>
          </div>
        ))}
      </div>
    );
    setSliderData((sliderData) => [...sliderData, favouriteCreatorsDiv]);
    console.log("hashtags div");
    const favouriteHashtagsDiv = (
      <div id="print">
        <div className="title_text">MOST COMMON HASHTAGS</div>
        <div className="hashtags_panel">
          <div className="hashtags_column">
            {userData.most_common_hashtags.map((hasht, i) => (
              <div className="creator_row" id="hashtag_number" onClick={() => {handleVideoChange(i)}}>
                <div className="rank_number" >
                  {i + 1}
                </div>

                <p key={i} style={{ margin: "3px 0" }}>
                  #{hasht[0]} - {hasht[1]}
                </p>
              </div>
            ))}
          </div>
          <VideoPlayer 
            most_common_hashtags_video={userData.most_common_hashtags_video}
          />
        </div>
      </div>
    );
    setSliderData((sliderData) => [...sliderData, favouriteHashtagsDiv]);
    console.log("sound div");

    const favouriteSoundsDiv = (
      <div id="print">
        <div className="title_text">MOST LIKED SOUNDS</div>
        <div className="sounds_panel">
          {albumSucks}
          {/* <AlbumPlayer
            most_liked_sounds_album={userData.most_liked_sounds_album} id = "album_player"
          /> */}
          <div className="sounds_column">
            {userData.most_liked_sounds.slice(0, 5).map((hasht, i) => (
              <div
                className="sounds_row"
                key={i}
                onClick={() => handleSoundChange(i)}
              >
                <div className="rank_number" id="sounds_number">
                  {i + 1}
                </div>
                <div>{hasht[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    setSliderData((sliderData) => [...sliderData, favouriteSoundsDiv]);
    console.log("score div");
    const straight_percentage =  (Math.round(userData.straight_score[0]  * 10000) / 100).toString() + "%";
    const cringe_precentage = (Math.round(userData.cringe_score[0]  * 10000) / 100).toString() + "%";
    const education_percentage = (Math.round(userData.education_score[0]  * 20000 / 300)).toString() + "%";
    const ratingDiv = (
      <div>
        <div className="title_text">WHAT SIDE OF TIKTOK ARE YOU ON?</div>
        <div className="score_panel">
          <div className="score_column">
            <div className="score_slider">
              <div className="score_name">
                <div>Alt</div>
                <div>Straight</div>
              </div>
              <div className="meter">
                <span style={{ width: straight_percentage }}></span>
              </div>
              <div className="percentage">{straight_percentage}</div>
            </div>
            <div className="score_slider">
              <div className="score_name">
                <div>Based</div>
                <div>Cringe</div>
              </div>
              <div className="meter">
                <span style={{ width: cringe_precentage }}></span>
              </div>
              <div className="percentage">{cringe_precentage}</div>
            </div>
            <div className="score_slider">
              <div className="score_name">
                <div>Entertaining</div>
                <div>Educational</div>
              </div>
              <div className="meter">
                <span style={{ width: education_percentage }}></span>
              </div>
              <div className="percentage">{education_percentage}</div>
            </div>
          </div>
        </div>
      </div>
    );
    setSliderData((sliderData) => [...sliderData, ratingDiv]);

    const mostViewedVideoDiv = (
        <VideoPanel title = "MOST VIEWED VIDEO" src = {userData.most_popular_liked_videos.address} stats = {userData.most_popular_liked_videos.stats}></VideoPanel>
    );
    setSliderData((sliderData) => [...sliderData, mostViewedVideoDiv]);
    
    const tiktokRewind1 = (
      <VideoPanel title = "REWIND YOUR TIKTOK:" src = {userData.rewind[0].address} stats = {userData.rewind[0].stats}></VideoPanel>
  );
  setSliderData((sliderData) => [...sliderData, tiktokRewind1]);

  const tiktokRewind2 = (
    <VideoPanel title = "REWIND YOUR TIKTOK:" src = {userData.rewind[1].address} stats = {userData.rewind[1].stats}></VideoPanel>
  );
  setSliderData((sliderData) => [...sliderData, tiktokRewind2]);

  const tiktokRewind3 = (
    <VideoPanel title = "REWIND YOUR TIKTOK:" src = {userData.rewind[2].address} stats = {userData.rewind[2].stats}></VideoPanel>
  );
  setSliderData((sliderData) => [...sliderData, tiktokRewind3]);



    setInvisible(false);
  };

  return (
    <div>
      <div className="banner" style={bannerStyle}>
        <img
          src="https://lh3.googleusercontent.com/TDjcir9c-_WbQxCcOFqx8KAQ8T6ZiQUDSUb_WnXGg8aONczHXjc5DmIdHl8uzQpCiPugCUpQbBKXpWo7QTIffPfZ3Bjve1wv_ILVzKtHuuphjX_IFkOOW-9n3nTh5uFJZSyhiCh5XY0=w2400"
          alt="kms"
          height="178"
        />
      </div>

      <Search
        onsubmit={fetchUser}
        usernameInputField={usernameInputField}
        setUsernameInputField={setUsernameInputField}
      />

      <div style={{ display: "none" }}>
        <b>USERNAME: </b>
        <p>{user}</p>
      </div>

      {invisible ? (
        <div className="start_screen">
          <div className="instructions">
            <div id="getting_started">GETTING STARTED</div>
            <div id="text">set your tiktok likes to public and enter your account name</div>
          </div>
          <div>
          {loading ? (
            <div className="loading">
              <img src = "https://olaargentina.com/wp-content/uploads/2019/11/loading-gif-transparent-10.gif"></img>
            </div>
          ) : (
            <></>
          )}
          </div>
        </div>
      ) : (
        <ImageSlider sliderData={sliderData} userData={userData} username = {user}/>

      )}

      {true ? (
        <div></div>
      ) : (
        <div className="panel-home">
          <Panel userData={userData}></Panel>
          <Panel userData={userData}></Panel>
        </div>
      )}

      <div>
        {true ? (
          <p></p>
        ) : (
          data.programmers.map((people, i) => <p key={i}>{people}</p>)
        )}
      </div>
    </div>
  );
}

// Styles
const carouselStyle = {};
const bannerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", 
  alignItems: "center",
  color: "red",
};

export default App;
