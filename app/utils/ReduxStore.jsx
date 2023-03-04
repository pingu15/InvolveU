import { createSlice, configureStore } from '@reduxjs/toolkit'

/*
Redux store for the app.

The main slice stores all the data required for the app:
username
usersData
userData (initial state is given a placeholder if the user is not logged in)
eventsData
itemsData

Reducers are used to modify the data in the state. They are dispatched in various
components through actions.
 
Data is stored in JSON format.

*/
const mainSlice = createSlice({
  name: 'main',
  initialState: {
    username: '',
    usersData: [],
    userData: {username: "Guest", points: 0, grade: 9, email: ""},
    eventsData: [],
    itemsData: [],
  },
  reducers: {
    setUsername: (state, action) => {
        state.username = action.payload
    },
    setUsersData: (state, action) => {
        state.usersData = action.payload
    },
    setUserData: (state, action) => {
        state.userData = action.payload
    },
    setEventsData: (state, action) => {
        state.eventsData = action.payload
    },
    logout: (state) => {
        state.username = ''
        state.userData = {}
    },
    setItemsData: (state, action) => {
      state.itemsData = action.payload
    },
  }
})

// dispatchable actions
export const { setUsername, setUsersData, setUserData, setEventsData, logout, setItemsData } = mainSlice.actions

// creates the Redux store
const store = configureStore({
  reducer: mainSlice.reducer
})

export default store;

