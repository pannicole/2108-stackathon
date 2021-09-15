import Axios from "axios";

const initialState = {
  users: [],
  posts: [],
  singleUser: {},
  singlePost: {}
}

const SET_USERS = "SET_USERS"
const SET_POSTS = "SET_POSTS"
const _getSingleUser = "GET_SINGLE_USER"
const _getSinglePost = "GET_SINGLE_POST"

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
}

export function getUsers () {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get("/api/users")
      dispatch(setUsers(data))
    }
    catch(err) {
      console.log(err)
    }
  }
}

const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts
  }
}

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get("/api/posts")
      dispatch(setPosts(data))
    }
    catch(err) {
      console.log(err)
    }
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type){
    case SET_POSTS:
      return {...state, posts: action.posts}
    case SET_USERS:
      return {...state, users: action.users}
    default:
      return state
  }
}
