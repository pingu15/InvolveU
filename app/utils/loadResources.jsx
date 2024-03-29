import * as React from "react";
import { GetItems, GetEvents, GetUsers } from "./InvolveUApi";
import { useDispatch } from "react-redux";
import { setItemsData, setUsersData, setEventsData } from "./ReduxStore";

/**
 * Fetches model and users data from the database and stores it in the Redux store.
 * 
 * @returns {boolean} True if the data has been loaded, false otherwise
 */
export default function loadResources() {
  const [doneLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  if (doneLoading) return true;
  GetItems()
    .then((items) => {
      dispatch(setItemsData(items));
    })
    .catch((err) => console.log(err))
    .then(() => GetEvents())
    .then((events) => {
      dispatch(setEventsData(events));
    })
    .catch((err) => console.log(err))
    .then(() => GetUsers())
    .then((users) => {
      dispatch(setUsersData(users));
    })
    .catch((err) => console.log(err))
    .then(() => {
      setLoading(true);
    });
  return doneLoading;
}
