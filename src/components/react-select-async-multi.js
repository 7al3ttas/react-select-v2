import React, { Component } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/lib/Async';

class ReactSelectAsyncMulti extends Component {
 constructor(props) {
  super(props)
  this.state = {
    value: null,
  }
}

// for initialize Options in update case .
UNSAFE_componentWillMount(){
  if(this.props.users) {
    let value = this.props.users.map(user => ({
    value: user.id,
    label: user.login
    }));
    this.setState({ value : value })
   }
}
  
getOptions =  async (_params) => {
  let _A7Async =  await axios.get(`https://api.github.com/search/users?`,{params:{q:_params}})
  //curl https://api.github.com/search/users?q=
  .then( response => {
    console.log("response :  ", response)
    let options = response.data.items.map(user => ({
    value: user.id,
    label: user.login
  }));
  return { options };
  }).catch((error) => {
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
  const ids = []
  value.map(v =>
    ids.push(v.value)
  )
  this.setState({ value })
}
  render() {
    return (
        <AsyncSelect
           isMulti={true}
           value={this.state.value}
           onChange={this.handleOnChange}
           onInputChange={this.loadOptions}
           loadOptions = {this.loadOptions}
           placeholder={"Select GitHub Users .."}
         />
    );
  }
}

export default ReactSelectAsyncMulti;
