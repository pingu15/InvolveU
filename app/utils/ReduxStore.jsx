import { createSlice, configureStore } from '@reduxjs/toolkit'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    username: '',
    usersData: [],
    userData: {},
    eventsData: [],
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
  }
})

export const { setUsername, setUsersData, setUserData, setEventsData } = mainSlice.actions

const store = configureStore({
  reducer: mainSlice.reducer
})

// Can still subscribe to the store
store.subscribe(() => {
    console.log("from store:" + JSON.stringify(store.getState().username));
    console.log("from store:" + JSON.stringify(store.getState().usersData));
    console.log("from store:" + JSON.stringify(store.getState().userData));
    console.log("-----------------");
})

export default store;