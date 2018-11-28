// you must handel redux-form in your app ..
// this is not complete yet ..
// just to show you how can handel react-select with redux-form .

import React, { Component  } from 'react';
//import { default as ReactSelect } from 'react-select'; // v2
import AsyncSelect from 'react-select/lib/Async'; // v2
import { Field, reduxForm } from 'redux-form';

// can you put this class as sprated component .
class ReactSelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  // if you have Initial Option
  componentDidMount(){
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
    let _value  = value.value;
    this.props.input.onChange(_value)
    this.setState({ value })
  }

  render() {
    const { meta: { touched, error },} = this.props;
    return (
          <AsyncSelect
            isMulti={false}
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

class ReactSelectASyncSingleReduxForm extends Component {
    /* handel redux-form befor this component .
    // new .
        <ReactSelectASyncSingleReduxForm
            onSubmit={handleValuesChange}
        />
    // update ..
        <ReactSelectASyncSingleReduxForm
            initialValues={{
              user_id: 7,
            }}
            onSubmit={handleValuesChange}
            user={this.props.user}
        />
    */

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
              <Field
                name="user_id"
                component={ReactSelectField}
                label="User"
                user={this.props.user}
              >
              </Field>
      </form>
    )
  }
}

export default reduxForm({
  form: 'ReactSelectASyncSingleReduxForm',
})(ReactSelectASyncSingleReduxForm);
