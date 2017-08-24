import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Banner from '../common/Banner';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { validateSignupInput } from '../../utils/validateInput';
import { signup } from '../../actions/authActions';

class SignupPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      username: '',
      phonenumber: '',
      password: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateSignupInput(this.state);
    if(!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} })
      this.props.signup(this.state).then(() => {
        if (this.props.currentUser) {
          toastr.success('Welcome to PostIt');
        }
      });
    } 
  }

  render() {  
    if (this.props.currentUser) {
      return (
        <Redirect to = '/messageboard'/>
      );
    }

    return (
      <div className="login teal lighten-1">
      <div className="container">
        <div className="row top-space">
          <div className="col s12 m6 l6">
            <Banner/>
          </div>
          <div className="col s12 m6 l6">
            <form className="white col s12 z-depth-5">
  			      <h6 className="center-align link">
                Already a member?
                <Link to="/login"> Login</Link>
              </h6>
              <div className="divider"></div>
  				      <TextInput
                  icon="mail"
						      type="email"
						      name="email"
						      value={this.state.email}
						      onChange={this.handleChange}
                  label="Email Address"
                  error={this.state.errors.email}
                />
                <TextInput
                  icon="account_circle"
						      type="text"
						      name="username"
						      value={this.state.username}
						      onChange={this.handleChange}
                  label="Username"
                  error={this.state.errors.username}
                />
                <TextInput
                  icon="phone"
						      type="tel"
						      name="phonenumber"
						      value={this.state.phonenumber}
						      onChange={this.handleChange}
                  label="Phone Number"
                  error={this.state.errors.phonenumber}
                />
                <TextInput
                  icon="lock"
						      type="password"
						      name="password"
						      value={this.state.password}
						      onChange={this.handleChange}
                  label="Password"
                  error={this.state.errors.password}
                />
      			    <div className="row center-align">
                  <Button
										className="btn waves-effect waves-light red lighten-2"
                    onClick={this.handleSubmit}
                    text="Create Account"
                  />
      			    </div>
			      </form>  
          </div>
			  </div> 
			</div>
      </div>
    );
  }
  
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({ signup }, dispatch);

SignupPage.propTypes = {
  currentUser: PropTypes.number,
  signup: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
