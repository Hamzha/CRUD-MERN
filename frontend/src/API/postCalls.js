import { createAsyncThunk } from '@reduxjs/toolkit'
const axios = require("axios");

export const getLogin = (data) => createAsyncThunk(
  'user/login',
  async (thunkAPI) => {
    console.log("test")
    axios.post('http://localhost:5000/register', data)
      .then(function (response) {
        console.log(response);
        return response
      })
      .catch(function (error) {
        console.log(error);
        return error
      });
  })


