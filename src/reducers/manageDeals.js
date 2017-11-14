export default function manageDeals(state={deals: []}, action){
  switch (action.type) {
    case "CREATE_DEAL":
      return Object.assign({}, state, { deals: state.deals.concat(action.deal)})
    case "LOAD_DEALS":
      return Object.assign({}, state, { deals: state.deals.concat(action.deals) })
    default:
      return state
  }
}

// case "SET_DEALS":
//   return Object.assign({}, state, {former_deals: action.former_deals, todays_deals: action.todays_deals, future_deals: action.future_deals})
