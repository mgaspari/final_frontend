export const addUser = (user) => {
  return{
    type: "CREATE_USER",
    user
  }
}
// return (dispatch) => {
//   dispatch({type: "GETTING_LOGGED_IN"})
//   return fetch("http://localhost:3000/api/v1/sessions", {
//     method: 'POST',
//     headers: {'content-type': 'application/json',
//     'accept': 'application/json'},
//     body: JSON.stringify(user)
//   }).then(res => res.json().then(json => dispatch({type: "CREATE_USER", json})))
// }
