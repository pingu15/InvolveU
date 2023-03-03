import { createSlice, configureStore } from '@reduxjs/toolkit'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    username: '',
    usersData: [],
    userData: {},
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

export const { setUsername, setUsersData, setUserData, setEventsData, logout, setItemsData } = mainSlice.actions

const store = configureStore({
  reducer: mainSlice.reducer
})

// Can still subscribe to the store
store.subscribe(() => {
    console.log("from store [username]:" + JSON.stringify(store.getState().username));
    console.log("from store [usersData]:" + JSON.stringify(store.getState().usersData));
    console.log("from store [userData]:" + JSON.stringify(store.getState().userData));
    console.log("from store [eventsData]:" + JSON.stringify(store.getState().eventsData));
    console.log("from store [itemsData]:" + JSON.stringify(store.getState().itemsData));
    console.log("-----------------");
})

export default store;