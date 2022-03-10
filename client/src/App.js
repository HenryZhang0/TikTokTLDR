import React, { useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState([{}])
  
useEffect(() => {
  fetch("/members").then(
    res => res.json()
  ).then(
    data => {
      setData(data)
      console.log(data)
    }
  )
}, [])

  return (
    <div>
    <b>PEOPLE</b>
    {(typeof data.people === 'undefined') ? (
      <p>Loading...</p>
    ) : (
      data.people.map((people, i) => (
        <p key={i}>{people}</p>
      ))
    )}      

    </div>
  )
}

export default App