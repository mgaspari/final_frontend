export default function manageUsers(state={loading: false, users: []}, action){
  switch (action.type) {
    case "CREATE_USER":
      return Object.assign({}, state, { users: state.users.concat(action.user)})
    default:
      return state
  }
}
// Object.assign({}, state, {users: state.users.concat(action.user)})
// case "GETTING_LOGGED_IN":
// return Object.assign({}, state, {loading: true})
// case "CREATE_USER":
//   return {loading: false, users: action.user}
