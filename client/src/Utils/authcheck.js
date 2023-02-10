import React, { Component } from 'react';
import history from './history';
import { 
  login_failure,
  login_success,
  remove_db_profile,
  remove_profile,
  add_profile,
  set_db_profile } from '../redux/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';




class AuthCheck extends Component {

  send_profile_to_db = (profile) => {
    const data = profile
    axios.post('/users', data )
      .then(axios.get(`/users?name=${profile.profile.name}`)
        .then(res => this.props.set_db_profile(res.data)) )
  }


  componentDidMount() {
    if(this.props.auth.isAuthenticated()) {
      this.props.login_success()
      this.props.add_profile(this.props.auth.userProfile)
      this.send_profile_to_db(this.props.auth.userProfile)
      setTimeout(() => history.replace('/'), 50)
    }
    else {
      this.props.login_failure()
      this.props.remove_profile()
      this.props.remove_db_profile()
      history.replace('/')
    }
  }

  render() {
    return(
        <div>
        </div>
    )}
}

function mapStateToProps (state) {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(login_success()),
    login_failure: () => dispatch(login_failure()),
    add_profile: (profile) => dispatch(add_profile(profile)),
    remove_profile: () => dispatch(remove_profile()),
    set_db_profile: (profile) => dispatch(set_db_profile(profile)),
    remove_db_profile: () => dispatch(remove_db_profile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);
