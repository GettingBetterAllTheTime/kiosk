import { configureStore, createSlice } from '@reduxjs/toolkit'

let seats = createSlice({
  name: 'a',
  initialState: ''
})

export default configureStore({
  reducer: {
    seats: seats.reducer
  }
}) 