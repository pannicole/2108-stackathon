import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux'

export class AllPosts extends Component {
  componentDidMount(){
    this.props.getPosts()
  }
  render() {
    let render = "Loading"
    if(this.props.posts.length > 0) {
      console.log(this.props.posts)
      return (<div className = "posts-list">
        {this.props.posts.map( (post) => {
          return (
            <div key = {post.id} >
            {post.user.usearname}
            {post.description}
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
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch, { history } ) => {
  return {
    getPosts: () => dispatch(getPosts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)
