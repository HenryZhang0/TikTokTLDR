import React, { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import Panel from "./components/Panel";
import { StackedCarousel } from "react-stacked-carousel";
//import "react-stacked-carousel/dist/index.css";
import "./carousel.css";
import { SliderData } from "./components/SliderData";
import ImageSlider from "./components/ImageSlider";

function App() {
  // VARIABLES
  const [data, setData] = useState([{}]);
  const [userData, setUserData] = useState([{}]);
  const [user, setUser] = useState("");
  const [invisible, setInvisible] = useState(true);
  const [sliderData, setSliderData] = useState([]);
  const isFirstRender = useRef(true);
  // UI variables
  const [usernameInputField, setUsernameInputField] = useState("");

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
  }, [userData]);

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
  }, []);

  const fetchUser = (event) => {
    event.preventDefault();
    setUser(usernameInputField);
    console.log(`Account name entered was: ${usernameInputField}`);
    fetch(`/user/${usernameInputField}`)
      .then(
        // fetch userData
        (res) => res.json()
      )
      .then((data) => setUserData(data));
  };

  const createSlides = () => {
    console.log("data", userData);
    console.log("creator div");
    console.log(userData);
    const favouriteCreatorsDiv = (
      <div className="creators_panel">
        <div className="title_text">Your Top Creators</div>
        {userData.most_liked_users.map((hasht, i) => (
          <div className="creator_row" key={i}>
            <div className="rank_number">#{i + 1}</div>

            <img
              src={hasht[2]}
              alt="Profile Picture"
              width="78"
              height="78"
            ></img>
            <div className="creater_username">
              {hasht[0]} - {hasht[1]}
            </div>
          </div>
        ))}
      </div>
    );
    setSliderData((sliderData) => [...sliderData, favouriteCreatorsDiv]);
    console.log("hashtags div");
    const favouriteHashtagsDiv = (
      <div>
        <div className="title_text">MOST COMMON HASHTAGS</div>
        <div className="hashtags_panel">
          <div>
            {userData.most_common_hashtags.map((hasht, i) => (
              <div className="creator_row">
                <div className="rank_number" id="hashtag_number">
                  #{i + 1}
                </div>

                <p key={i} style={{ margin: "3px 0" }}>
                  {hasht[0]} - {hasht[1]}
                </p>
              </div>
            ))}
          </div>
          <div className="hashtag_video">
            <video className = 'video' height="240" src = {userData.most_common_hashtags_video} autoPlay/>
              
          </div>
        </div>
      </div>
    );
    setSliderData((sliderData) => [...sliderData, favouriteHashtagsDiv]);
    console.log("sound div");

    const favouriteSoundsDiv = (
      <div>
        <div className="title_text">MOST LIKED SOUNDS</div>
        <div>
          {userData.most_liked_sounds.map((hasht, i) => (
            <p key={i} style={{ margin: "3px 0" }}>
              {hasht[0]} - {hasht[1]}
            </p>
          ))}
        </div>
      </div>
    );
    setSliderData((sliderData) => [...sliderData, favouriteSoundsDiv]);

    setInvisible(false);
  };

  //styles

  return (
    <div>
      <div style={bannerStyle}>
        <img
          src="https://pngfolio.com/images/all_img/copy/1631457787tiktok-logo-png_2.png"
          alt="kms"
          height="178"
        ></img>
      </div>

      <Search
        onsubmit={fetchUser}
        usernameInputField={usernameInputField}
        setUsernameInputField={setUsernameInputField}
      />

      <div>
        <b>USERNAME: </b>
        <p>{user}</p>
      </div>

      {invisible ? (
        <div> notthere </div>
      ) : (
        <div>
          <ImageSlider sliderData={sliderData} userData={userData} />
        </div>
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
