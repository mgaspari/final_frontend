export default function manageDeals(state={deals: []}, action){
  switch (action.type) {
    case "CREATE_DEAL":
      return Object.assign({}, state, { deals: state.deals.concat(action.deal)})
    default:
      return state
  }
}
