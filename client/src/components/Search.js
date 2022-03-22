const Search = ({onsubmit, usernameInputField, setUsernameInputField}) => {
  return (
    <div className = "searchBox" >
      <div>
        <form className='search' onSubmit={onsubmit}>
          <label>            
            <div className="inputBox" >
              <input
                className="textBox"
                type="text"
                value={usernameInputField}
                onChange={(e) => setUsernameInputField(e.target.value)}
                placeholder="Enter Account Name"
              />
              <button type="submit" >
                Search
              </button>
            </div>
          </label>
          
        </form>
      </div>
    </div>
  )
}
/* 
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
*/
export default Search
