export default function manageUsers(state={loading: false, users: []}, action){
  switch (action.type) {
    case "CREATE_USER":
      return Object.assign({}, state, { users: state.users.concat(action.user)})
    default:
      return state
  }
}
