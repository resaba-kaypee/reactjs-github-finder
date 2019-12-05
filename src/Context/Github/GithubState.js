import React, { useReducer } from "react";
import axios from 'axios';
import GithubReducer from "./githubReducer";
import {
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SEARCH_USERS,
} from "../types";
import githubContext from "./githubContext";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async val => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${val}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = res.data.items;
    dispatch({
      type: SEARCH_USERS,
      payload: data
    })
  };

  // Get User
  const getUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = res.data;
    dispatch({
      type: GET_USER,
      payload: data
    })
  };

  // Get Repos
  const getRepos = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = res.data;
    dispatch({
      type: GET_REPOS,
      payload: data
    })
  };
  // Clear Users
  const clearUsers = () => dispatch({type: CLEAR_USERS});

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING});

  return <githubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getRepos
    }}
  >
    {props.children}
  </githubContext.Provider>
}

export default GithubState