import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux'

export class AllPosts extends Component {
  componentDidMount(){
    this.props.getPosts()
  }
  render() {
    return <div>allposts div render</div>
  //   if(this.props.posts.length > 0) {
  //     const render = this.props.posts.map( (post) => {
  //       <div>
  //         {post.description}
  //       </div>
  //     })
  //   } else {
  //     const render = "loading"
  //   }
  //   return (
  //     <div>{render}</div>
  //   )
  // }
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
