import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' //next js redux toolkit

import axios from "axios";

export const GetLogin = createAsyncThunk(
  'user/getLogin',
  async (data, thunkAPI) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/login",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data
      })
      return res
    } catch (err) {
      return err
    }
  })

export const Register = createAsyncThunk(
  'user/register',
  async (data, thunkAPI) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/register",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data
      })
      return res
    } catch (err) {
      return err
    }
  })
export const GetListUser = createAsyncThunk(
  'user/getUsers',
  async (data, thunkAPI) => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:5000/all-users",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + data.token,

        },
        data
      })
      return res
    } catch (err) {
      return err
    }
  })
export const GetUserByID = createAsyncThunk(
  'user/getUser',
  async (data, thunkAPI) => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:5000/user/" + data.id,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + data.token,

        },
        data
      })
      return res
    } catch (err) {
      return err
    }
  })
export const UpdateUser = createAsyncThunk(
  'user/updateUser',
  async (data, thunkAPI) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/edit/" + data._id,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + data.token,

        },
        data
      })
      return res
    } catch (err) {
      return err
    }
  })
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    selectedUser: {},
    login: false,
    status: 'idle',
    message: ''
  },
  reducers: {
    SetState: (state, { payload: { field, value } }) => {
      state[field] = value;
    },
    Logout: (state) => {
      state.login = false
      state.user = {}
    },
    SetSelected: (state, payload) => {
      state.selectedUser = payload.payload
    }
  },
  extraReducers: {
    [GetLogin.pending]: (state) => {
      state.status = 'loading'
    },
    [GetLogin.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.status = 'completed'
        state.user = action.payload.data
        state.login = true
      }
      else {
        state.status = 'rejected'
        state.message = action.payload.response.data.message
      }
    },

    [GetUserByID.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.selectedUser = action.payload.data
      }
    },
    [Register.fulfilled]: (state, action) => {
      if (action.payload.status !== 200) {
        state.message = action.payload.response.data.message
      }
    }

  }
})
// case under reducers becomes an action
export const { SetState, Logout, SetSelected } = userSlice.actions
export default userSlice.reducer
