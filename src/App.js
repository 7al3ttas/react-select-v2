import React, { Component } from 'react';
import ReactSelectAsyncMulti from './components/react-select-async-multi';
import ReactSelectAsyncSingle from './components/react-select-async-single';
class App extends Component {
  render() {
    return (
      <div className="App">
       <h1> React Select Async Multi </h1>
       <ReactSelectAsyncMulti/>

      <h3> React Select Async Multi when initialize Options </h3>
      <ReactSelectAsyncMulti users={[{id:7, login:"7al3ttas"} , {id:70, login:"Hassan Alattas"} ]}/>

      <h3> React Select Async Single </h3>
       <ReactSelectAsyncSingle/>

      <h4> React Select Async Single when initialize Option </h4>
      <ReactSelectAsyncSingle user={{id:7, login:"7al3ttas"}}/>
          
    </div>
    );
  }
}

export default App;
