export default function manageMenus(state={width: "100px"}, action){
  switch (action.type) {
    case "GROW":
      return Object.assign({}, state, {width: "400px"})
    case "SHRINK":
      return Object.assign({}, state, {width: "100px"})
    default:
      return state
  }
}
