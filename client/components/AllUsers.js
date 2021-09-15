import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../redux'

export class AllUsers extends Component {
  componentDidMount(){
    this.props.getUsers()
  }
  render() {
    let render = "Loading"
    if(this.props.users.length > 0) {
      console.log(this.props.users)
      return (<div className = "users-list">
        {this.props.users.map( (user) => {
          return (
            <div key = {user.id} >
            {user.username}
            </div>
          )
        })}
      </div>
      )
    }
    return (
      <div>{render}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch, { history } ) => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
