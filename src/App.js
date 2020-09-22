import React, { useState, useContext, useReducer, useEffect } from 'react';
import './App.css';

function App() {
  const AppContext = React.createContext({});
  const [ buttonText, setButtonText ] = useState("Click me, please");

  const Navbar = () => {
    const { username } = useContext(AppContext)
    return (
      <div className="Navbar">
        <p>AwesomeSite</p>
        <p>{username}</p>
      </div>
    )
  };

  const Messages = () => {
    const { username } = useContext(AppContext)
  
    return (
      <div className="messages">
        <h1>Messages</h1>
        <p>1 message for {username}</p>
        <p className="message">useContext is awesome!</p>
      </div>
    )
  };

  function handleClick() {
    return setButtonText("Thanks, been clicked!");
  }

  const myReducer = (state, action) => {
    switch(action.type) {
      case('countUp'): 
        return {
          ...state,
          count: state.count + 1
        }
      default: 
        return state;
    }
  }

  const [ state, dispatch ] = useReducer(myReducer, {
    count: 0
  });

  const usePerson = (personId) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});

    useEffect(() => {
      setLoading(true);
      fetch(`https://swapi.co/api/people/${personId}/`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
          setLoading(false);
        })
    }, [personId]);

    return [loading, person];
  }

  const Person = ({ personId }) => {
    const [loading, person] = usePerson(personId);

    if (loading === true) {
      return <p>Loading ...</p>
    }

    return (
      <div>
        <p>You're viewing: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
      </div>
    )
  }

  const [show, setShow] = useState("1");
  return (
    <AppContext.Provider value={{ username: "superawesome" }}>
      <div className="App">
        <Navbar />
        <Messages />
        <hr />
        <button onClick={handleClick}>{buttonText}</button>;
        <hr />
        <button onClick={() => dispatch({ type: 'countUp' })}>
          +1
        </button>
        <p>Count: {state.count}</p>
        <hr />
        <Person personId={show} />
        <div>
          Show: 
          <button onClick={() => setShow("1")}>Luke</button>
          <button onClick={() => setShow("2")}>C-3PO</button>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App;
