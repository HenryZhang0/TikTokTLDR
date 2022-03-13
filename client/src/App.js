import React, { useState, useEffect } from "react";

function App() {
  // VARIABLES
  const [data, setData] = useState([{}]);
  const [userData, setUserData] = useState([{}]);
  const [user, setUser] = useState("");

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
        showData(data);
      })
      .then
      //console.log(jsonStr)
      ();
  };

  // this stuff shows the json data on the page
  var jsonStr;
  const showData = (dat) => {
    console.log("updating status panel");
    jsonStr = JSON.stringify(dat); // THE OBJECT STRINGIFIED
    var regeStr = "", // A EMPTY STRING TO EVENTUALLY HOLD THE FORMATTED STRINGIFIED OBJECT
      f = {
        brace: 0,
      }; // AN OBJECT FOR TRACKING INCREMENTS/DECREMENTS,
    // IN PARTICULAR CURLY BRACES (OTHER PROPERTIES COULD BE ADDED)

    regeStr = jsonStr.replace(
      /({|}[,]*|[^{}:]+:[^{}:,]*[,{]*)/g,
      function (m, p1) {
        var rtnFn = function () {
            return (
              '<div style="text-indent: ' +
              f["brace"] * 20 +
              'px;">' +
              p1 +
              "</div>"
            );
          },
          rtnStr = 0;
        if (p1.lastIndexOf("{") === p1.length - 1) {
          rtnStr = rtnFn();
          f["brace"] += 1;
        } else if (p1.indexOf("}") === 0) {
          f["brace"] -= 1;
          rtnStr = rtnFn();
        } else {
          rtnStr = rtnFn();
        }
        return rtnStr;
      }
    );

    document.getElementById("datadiv").innerHTML = jsonStr;
  };

  return (
    <div>
      <form onSubmit={fetchUser}>
        <label>
          Enter account name:
          <input
            type="text"
            value={usernameInputField}
            onChange={(e) => setUsernameInputField(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>

      <div>
        <b>USERNAME: </b>
        <p>{user}</p>
      </div>

      <div>
        <b>TIKTOK DATA</b>
        <p>{userData.username}</p>
        <img src = {userData.profilePicture} alt="Profile Picture" width="178" height="178"></img>
        <div id = "profilelink">
        <p><a href= {"https://www.tiktok.com/@" + String(userData.id)} target="_blank">TikTok Profile</a></p>
        </div>
        <div id="datadiv">{jsonStr}</div>
      </div>

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

export default App;
