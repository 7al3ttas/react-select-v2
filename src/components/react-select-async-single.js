import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';

class ReactSelectAsyncSingle extends Component {
 constructor(props) {
  super(props)
  this.state = {
    value: null,
  }
}


// if you have Initial Option
 UNSAFE_componentWillMount(){
  if(this.props.user) {
    this.setState({ value : {
    value: this.props.user.id,
    label: this.props.user.login}})
  }
}
  
getOptions =  async (_params) => {
  let _A7Async = await fetch(`https://api.github.com/search/users?q=${_params}`)
  .then(response => response.json())
  .then(response => {
    let options;
    options = response.items.map(user => ({
      value: user.id,
      label: user.login
    }));
    return { options }; 
  })
  .catch( error => {
    return { options : [] };
  }); 
 return _A7Async.options
}

loadOptions = (params) => {
  if (!params) {
    return Promise.resolve({ options: [] });
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(this.getOptions(params))
    }, 1000);
  });
}


handleOnChange = (value) => {
  this.setState({ value })
}
  render() {
    return (
        <AsyncSelect
           isMulti={false}
           value={this.state.value}
           onChange={this.handleOnChange}
           onInputChange={this.loadOptions}
           loadOptions = {this.loadOptions}
           placeholder={"Select GitHub User .."}
         />
    );
  }
}

export default ReactSelectAsyncSingle;
