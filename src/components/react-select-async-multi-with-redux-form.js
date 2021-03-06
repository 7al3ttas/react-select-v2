// you must handel redux-form in your app ..
// this is not complete yet ..
// just to show you how can handel react-select with redux-form .

import React, { Component, Fragment } from 'react';
//import { default as ReactSelect } from 'react-select'; // v2
import AsyncSelect from 'react-select/lib/Async'; // v2
import axios from "axios"; // v2
import { Field, reduxForm } from 'redux-form';

// can you put this class as sprated component .
class ReactSelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  // for initialize Options in update case .
  componentDidMount(){
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
    this.props.input.onChange(ids)
    this.setState({ value })
  }

  render() {
    const { meta: { touched, error },} = this.props;
    return (
          <AsyncSelect
            isMulti={true}
            value={this.state.value}
             onChange={this.handleOnChange}
             onInputChange={this.loadOptions}
             loadOptions = {this.loadOptions}
             placeholder={"Select .."}
             name={this.props.input.name}
          />
    )
  }
}

class ReactSelectASyncMultiReduxForm extends Component {
    /* handel redux-form befor this component .
    // new
        <ReactSelectASyncMultiReduxForm
            onSubmit={handleValuesChange}
        />
    // update
        <ReactSelectASyncMultiReduxForm
          initialValues={{
          users_ids: [1,2,3],
          }}
          onSubmit={handleValuesChange}
          users={this.props.users}
        />
     */

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
              <Field
                name="users_ids"
                component={ReactSelectField}
                label="Users"
                users={this.props.users}
              >
              </Field>
      </form>
    )
  }
}

export default reduxForm({
  form: 'ReactSelectASyncMultiReduxForm',
})(ReactSelectASyncMultiReduxForm);
