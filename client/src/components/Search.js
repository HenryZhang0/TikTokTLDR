const Search = ({onsubmit, usernameInputField, setUsernameInputField}) => {
  return (
    <div className = "searchBox" style={searchBox}>
      <div>
        <form onSubmit={onsubmit}>
          <label>            
            <div className="inputBox" style={inputBox}>
              <input
                className="textBox"
                type="text"
                value={usernameInputField}
                onChange={(e) => setUsernameInputField(e.target.value)}
                style={textBar}
                placeholder="  Enter Account Name"
              />
              <button type="submit" style={buttonStyle}>
                <img src="http://assets.stickpng.com/images/585e4ad1cb11b227491c3391.png" width="25" height="25"/>
              </button>
            </div>
          </label>
          
        </form>
      </div>
    </div>
  )
}

const searchBox = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'red',
  fontFamily: 'comic sans ms',

  backgroundColor: 'pink',
  width: '100%',
}

const inputBox = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexBasis: '100%',
  backgroundColor: 'red',
  height: '30px',
  width: '500px',
}

const textBar = {
  outline: 'none',
  borderRadius: '10px 0 0 10px',
  border: '1px solid black',
  //flexGrow: '5'
  flexBasis: '100%',
  //backgroundColor: 'green',
}

const buttonStyle = {
  borderRadius: '0px 10px 10px 0px',
  border: '1px solid black',
}

export default Search
