// actions/auth.js
import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import swal from 'sweetalert';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("Login response data:", data); // Debugging API response
    dispatch({ type: AUTH, data });
    localStorage.setItem('profile', JSON.stringify(data)); // Save user data to localStorage
    router.push('/');
  } catch (error) {
    console.log("Sign-in error", error);
    swal({
      title: "Error",
      text: error?.response?.data?.message || "Failed to login",
      icon: "error",
    });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log("Signup response data:", data); // Debugging API response
    dispatch({ type: AUTH, data });
    localStorage.setItem('profile', JSON.stringify(data)); // Save user data to localStorage
    router.push('/');
  } catch (error) {
    console.log("Sign-up error", error);
    swal({
      title: "Error",
      text: error?.response?.data?.message || "Failed to register",
      icon: "error",
    });
  }
};
