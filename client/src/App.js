import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Panel from "./components/Panel";
import { StackedCarousel } from "react-stacked-carousel";
//import "react-stacked-carousel/dist/index.css"; 
import "./carousel.css"

function App() {
  // VARIABLES
  const [data, setData] = useState([{}]);
  const [userData, setUserData] = useState([{}]);
  const [user, setUser] = useState("");
  const [invisible, setInvisible] = useState(false);

  // UI variables
  const [usernameInputField, setUsernameInputField] = useState("");

  // card carousel stuff
  const [card, setCard] = useState(null);
  const onCardChange = (event) => {
    console.log("Card", event);
  };

  // RUN ONCE
  useEffect(() => {
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
      .then((data) => {
        setUserData(data);
        console.log("data", data);
      });
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

      {true ? (
        <div></div>
      ) : (
        <div className="panel-home">
          <Panel userData={userData}></Panel>
          <Panel userData={userData}></Panel>
        </div>
      )}

      <div className="panel-home" style = {carouselStyle}>



        
        <StackedCarousel
          autoRotate={false}
          onCardChange={onCardChange}
          containerClassName={"container"}
          cardClassName="card"
          leftButton={<button>{"<"}</button>}
          rightButton={<button>{">"}</button>}
        >
          <div key={"child1"}>
            <h2>1 Card</h2>
            <Panel userData={userData}></Panel>

          </div>
          <div key={"child2"}>
            <h2>2 Card</h2>
            <Panel userData={userData}></Panel>
          </div>
          <div key={"child3"}>
            <h2>3 Card</h2>
            <Panel userData={userData}></Panel>

          </div>
          <div key={"child4"}>
            <h2>4 Card</h2>
            <Panel userData={userData}></Panel>
  
          </div>
        </StackedCarousel>
        
      </div>

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
const carouselStyle = {

}
const bannerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "red",
};

export default App;
