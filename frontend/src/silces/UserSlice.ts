import { createSlice } from '@reduxjs/toolkit'

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: 1,
      name: '',
      email: '',
      password: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = UserSlice.actions
export default UserSlice.reducer
