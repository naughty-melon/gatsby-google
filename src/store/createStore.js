import { createStore } from 'redux'
import rootReducer from "./reducers/root.reducer"

export default function() {
  const store = createStore(rootReducer)
  return store
}