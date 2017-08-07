import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import Banner from '../common/Banner';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import validateInput from '../../utils/validateInput';
import * as authActions from '../../actions/authActions';

class SignupPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      email: '',
      username: '',
      phonenumber: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
   if(this.props.currentUser) {
     browserHistory.push('/messageboard');
   } 
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if(!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} })
      this.props.actions.signup(this.state)
      .then(() => {
        if (this.props.currentUser) {
        toastr.success('Welcome to PostIt');
        browserHistory.push('/messageboard');
        } 
      });
    } 
  }

  render() {
    const { errors } = this.state;
    
    return (
      <div className="container">
        <div className="row top-space">
          <div className="col s12 m6 l6">
            <Banner/>
          </div>
          <div className="col s12 m6 l6">
            <form className="white col s12 z-depth-5">
  			      <h6 className="center-align link">
                Already a member?
                <Link to="login"> Login</Link>
              </h6>
              <div className="divider"></div>
  				      <TextInput
                  icon="mail"
						      type="email"
						      name="email"
						      value={this.state.email}
						      onChange={this.onChange}
                  label="Email Address"
                  error={errors.email}
                />
                <TextInput
                  icon="account_circle"
						      type="text"
						      name="username"
						      value={this.state.username}
						      onChange={this.onChange}
                  label="Username"
                  error={errors.username}
                />
                <TextInput
                  icon="phone"
						      type="tel"
						      name="phonenumber"
						      value={this.state.phonenumber}
						      onChange={this.onChange}
                  label="Phone Number"
                  error={errors.phonenumber}
                />
                <TextInput
                  icon="lock"
						      type="password"
						      name="password"
						      value={this.state.password}
						      onChange={this.onChange}
                  label="Password"
                  error={errors.password}
                />
      			    <div className="row center-align">
      				    <Button 
                    className="btn waves-effect waves-light red lighten-2"
                    onClick={this.onSubmit}
                    >CREATE ACCOUNT
                  </Button>
      			    </div>
			      </form>  
          </div>
			  </div> 
			</div>
    );
  }

}

SignupPage.propTypes = {
  currentUser: PropTypes.number,
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return{
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);