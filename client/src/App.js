import React, { useState, useEffect } from "react";
import Search from './components/Search'
import Panel from './components/Panel'


function App() {
  // VARIABLES
  const [data, setData] = useState([{}]);
  const [userData, setUserData] = useState([{}]);
  const [user, setUser] = useState("");
  const [invisible, setInvisible] = useState(false);

  // UI variables
  const [usernameInputField, setUsernameInputField] = useState("");

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
      })
  };



  //styles
  

  return (
    <div>
      <div style = {bannerStyle}>
        <img src = "https://pngfolio.com/images/all_img/copy/1631457787tiktok-logo-png_2.png" alt = "kms" height="178"></img>
      </div>
      <Search onsubmit = {fetchUser} usernameInputField = {usernameInputField} setUsernameInputField = {setUsernameInputField}/>
      
      {/* <form onSubmit={fetchUser}>
        <label>
          Enter account name:
          <input
            type="text"
            value={usernameInputField}
            onChange={(e) => setUsernameInputField(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form> */}

      <div>
        <b>USERNAME: </b>
        <p>{user}</p>
      </div>

      {invisible ? (
        <div></div>
      ) : (
        <div className="panel-home">
          <Panel userData = {userData}></Panel>
          <Panel userData = {userData}></Panel>

        </div>
        
      )}

      <div>
        <b>PROGRAMMERS (this is an example)</b>
        {typeof data.programmers === "undefined" ? (
          <p>Loading...</p>
        ) : (
          data.programmers.map((people, i) => <p key={i}>{people}</p>)
        )}
      </div>
    </div>
  );
}

// Styles
const bannerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'red',
}

export default App;
