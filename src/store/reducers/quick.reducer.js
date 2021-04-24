const initialState = {
  quickData: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "CHANGEDATA": {
      return {
        quickData: action.payload
      }
    }
    // case "DELETEDATA": {
    //   return {

    //   }
    // }
    default: {
      return state
    }
  }
}