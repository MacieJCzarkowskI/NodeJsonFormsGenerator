import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authorizationService, Credentials, User } from '@src/services'
import { AsyncStatus } from '@src/types'

const name: string = 'authorization'

export interface AuthorizationState {
  status: AsyncStatus
  user: User | undefined
  message: string | undefined // TODO
}

const initialState: AuthorizationState = {
  user: undefined,
  message: undefined,
  status: 'idle',
}

export const performLogin = createAsyncThunk(`${name}/login`, (credentials: Credentials) => {
  return authorizationService.login(credentials)
})

const authorizationSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(performLogin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(performLogin.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.user = payload
      })
      .addCase(performLogin.rejected, (state, { error }) => {
        state.status = 'fail'
        state.message = error.message
      })
  },
})

export const { reducer: authorization } = authorizationSlice
