import Axios from "axios";

const initialState = {
  users: [],
  posts: [],
  singleUser: {},
  singlePost: {},
  auth: {}
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

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type){
    case SET_POSTS:
      return {...state, posts: action.posts}
    case SET_USERS:
      return {...state, users: action.users}
    case SET_AUTH:
      return{...state, auth: action.auth}
    default:
      return state
  }
}
