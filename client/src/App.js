import React, { useState, useEffect} from 'react'

function App() {

// VARIABLES
  const [data, setData] = useState([{}])
  const [userData, setUserData] = useState([{}])
  const [user, setUser] = useState("")

// UI variables
  const [usernameInputField, setUsernameInputField] = useState("")



// RUN ONCE
  useEffect(() => {
    fetch("/programmers").then( // fetch programmers data
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
    fetch("/user/henry").then( // fetch userData
      res => res.json()
    ).then(
      data => {
        setUserData(data)
        console.log(data)
      }
    )
  }, [])

  const applyUsername = (event) => {
    event.preventDefault()
    //setUser(usernameInputField)
    console.log("Name entered: ", user)
  }

  return (
    <div>
      
      
      <form>
        <label>Enter account name:
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
        <p>
          {userData.username}
        </p>
      </div>
      
      <div>
        <b>PROGRAMMERS (this is an example)</b>
        {(typeof data.programmers === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.programmers.map((people, i) => (
            <p key={i}>{people}</p>
          ))
        )}     
      </div>

    </div>
  )
}

export default App