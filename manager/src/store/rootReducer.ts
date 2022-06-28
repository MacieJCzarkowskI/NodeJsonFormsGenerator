import { combineReducers } from '@reduxjs/toolkit'
import { authorization } from '@src/features/authorization/authorizationSlice'

export const rootReducer = combineReducers({
  authorization,
})

export type RootState = ReturnType<typeof rootReducer>
